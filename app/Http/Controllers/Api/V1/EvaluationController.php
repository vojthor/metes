<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Criterion;
use App\Models\CriterionEvaluation;
use App\Models\Methodology;
use App\Models\MethodologyCriteriaValues;
use App\Models\MethodologyProjectEvaluation;
use App\Models\Project;
use App\Models\ProjectCriterionValue;
use App\Models\ProjectEvaluation;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;


/**
 * Created by PhpStorm.
 * User: jandoond
 * Date: 23.04.2016
 * Time: 16:10
 */
class EvaluationController extends ApiController
{

    function permissionCheck($projectUserId)
    {
        return (Auth::user()->hasRole('admin') || (Auth::id() == $projectUserId));
    }

    /**
     * seznam ohodnocenych projektu
     *
     * @param $projectId
     *
     * @return mixed|string
     */
    public function getAll($userId, $projectId)
    {
        $project = Project::find($projectId);

        if ($this->permissionCheck($project->user_id)) {
            if (count($project) > 0) {
                return $this->respond([
                    'evaluations' => $project->
                    projectEvaluation()->
                    orderBy('updated_at', 'desc')->
                    get()
                ]);
            } else {
                return $this->respond([
                    "message" => "Project does not exist"
                ], 404);
            }
        } else {
            return $this->respond([
                "message" => "Forbidden"
            ], 404);
        }
    }

    /**
     * konkretni vysledek ohodnoceneho projektu
     *
     * @param $userId
     * @param $projectId
     * @param $projectEvaluateId
     *
     * @return mixed|string
     */
    public
    function detail(
        $userId,
        $projectId,
        $projectEvaluateId
    ) {

        $project = Project::find($projectId);

        if ($this->permissionCheck($project->user_id)) {

            $methodologyProjectEvaluation = MethodologyProjectEvaluation::where('project_evaluation_id', $projectEvaluateId)->with("criterion_evaluation")->orderBy('value', 'desc')->get();
            $criterionEvaluation = collect($methodologyProjectEvaluation)->pluck("criterion_evaluation");
            $importantCriterionGroup1 = 3;
            $importantCriterionGroup2 = 4;

            $eval_projects = MethodologyProjectEvaluation::where('project_evaluation_id', $projectEvaluateId)
                ->whereNotNull('type')
                ->orderBy('value', 'asc')
                ->get();

            $output = $eval_projects->map(function ($project) use ($projectEvaluateId) {

                $project->methodology = $project->methodology_model;
                $project->criteria = $project->criterion_evaluation->map(function ($criteria) use ($project, $projectEvaluateId) {

                    $criteria_detail = Criterion::find($criteria->criterion_id);
                    $criteria->name = $criteria_detail->name;


                    $meth_values = MethodologyCriteriaValues::where('criterion_id', $criteria->criterion_id)->where('methodology_id', $project->methodology_model->id)->orderBy('updated_at', 'desc')->first();
                    $criteria->methodogy_min = $meth_values->min;
                    $criteria->methodogy_max = $meth_values->max;
                    $criteria->methodogy_opt = $meth_values->opt;

                    $project_values = ProjectCriterionValue::where('criterion_id', $criteria->criterion_id)->where('project_id', $project->project_eval->project->id)->orderBy('updated_at', 'desc')->first();
                    $criteria->project_value = $project_values->value;
                    $criteria->project_weight = $project_values->weight;

                    $methodologyProjectEvaluation = MethodologyProjectEvaluation::where('project_evaluation_id', $projectEvaluateId)->where('methodology_id',
                        $project->methodology_model->id)->with("criterion_evaluation")->orderBy('updated_at',
                        'desc')->first();

                    $methodologyProjectEvaluation->criterion_evaluation->map(function ($criteria_eval_values) use ($criteria) {

                        if ($criteria->criterion_id == $criteria_eval_values->criterion_id) {
                            $criteria->eval_project_val = $criteria_eval_values->criterion_evaluation;
                            $criteria->eval_behind_extreme = $criteria_eval_values->behind_extremes;
                            $criteria->eval_dist_optimum = $criteria_eval_values->distance_from_optimum;
                            $criteria->eval_dist_abs = $criteria_eval_values->distance_absolute_values;
                        }
                    });


                    return $criteria;
                });


                return $project;
            });


            if (count($output) === 0) {
                $output = null;
            }

            return $this->respond([
                'project' => Project::find($projectId),
                'table_data' => $output
            ]);
        } else {
            return $this->respond([
                "message" => "Forbidden"
            ], 404);
        }

    }

    public
    function evaluateProjectX(
        $userId,
        $projectId
    ) {
        var_dump('ahoj');
    }

    /**
     * vyhodnoceni projektu
     *
     * @param $userId
     * @param $projectId
     *
     * @return mixed|string
     */
    public
    function evaluateProject(
        $userId,
        $projectId
    ) {

        $id = $projectId;
        $project = Project::find($projectId);
        $importantCriterionGroup1 = 3;
        $importantCriterionGroup2 = 4;

        if ($this->permissionCheck($project->user_id)) {

            if ($project->status == Project::STATUS_OK) {
                ProjectEvaluation::create(array(
                    'project_id' => $projectId,
                    'name' => $project->name,
                    'description' => $project->description
                ));
                Project::where([
                    ["id", $projectId],
                    ["user_id", $userId]
                ])->update([
                    "status" => Project::STATUS_IN_PROGRESS,
                ]);
            }
            $prEva = ProjectEvaluation::where('project_id', $projectId)
                ->orderBy('id', 'desc')
                ->first();
            $id_eva = $prEva->id;

            $projectEvaluation = projectEvaluation::find($id_eva);

            $methodologies = Methodology::all();


            $projectCriteriaValues = DB::table('project_criteria_values')
                ->join('criterions', 'project_criteria_values.criterion_id', '=', 'criterions.id')
                ->where('project_id', $projectId)
                ->whereIn('criterions.criterion_group_id', [$importantCriterionGroup1, $importantCriterionGroup2])
                ->select('project_criteria_values.*', 'criterions.criterion_group_id', 'criterions.is_key')
                ->get();

            $project = Project::find($id);

            if (!$projectCriteriaValues) {
                return $this->respond([
                    'message' => 'Nevyplněny hodnoty kritérií!'
                ]);
            } else {

                $n = 0; //pocet pouzitelnych metodik

                //pro kazdou metodiku, ktera je ve vyberu vytvorime zaznam --
                foreach ($methodologies as $methodology) {

                    MethodologyProjectEvaluation::create(array(
                        'methodology_id' => $methodology->id,
                        'project_evaluation_id' => $id_eva
                    ));

                    $methodologyProjectEvaluation = MethodologyProjectEvaluation::where('project_evaluation_id', $id_eva)
                        ->orderBy('id', 'desc')
                        ->first();

                    //tato suma hodnoti tu nej metodiku, toto je deklarace i reset, aby kazda metodika jela od nuly
                    $sumOf_distance_absolute_values = 0;
                    //je za metodika hranixemi klicovych kriterii?
                    $isOverBorderOfKeyCriteria = 0;

                    // vezmeme data a porovna je
                    foreach ($projectCriteriaValues as $i => $projectCriteriaValue) {
                        //vybere kriterio, ktere porovna z ohodnocenych metodik
                        $methodologyCriteriaValues = MethodologyCriteriaValues::where('methodology_id', $methodology->id)
                            ->where('criterion_id', $projectCriteriaValue->criterion_id)
                            ->first();

//                    var_dump($projectCriteriaValue->value);
//                    var_dump("loop for :" . $methodologies1[$i]->name);
                        if (!$methodologyCriteriaValues) {
                            break;
                        }
//                    var_dump($methodologyCriteriaValues->min);

                        if ($projectCriteriaValue->value < $methodologyCriteriaValues->min) {
                            $behind_extremes = $projectCriteriaValue->value - $methodologyCriteriaValues->min;
                        } elseif ($projectCriteriaValue->value > $methodologyCriteriaValues->max) {
                            $behind_extremes = $projectCriteriaValue->value - $methodologyCriteriaValues->max;
                        } else {
                            $behind_extremes = 0;
                        }
                        $distance_from_optimum = $projectCriteriaValue->value - $methodologyCriteriaValues->opt;
                        $distance_absolute_values = $distance_from_optimum * $projectCriteriaValue->weight;
                        //udelat absolutni hodnotu
                        if ($distance_absolute_values < 0) {
                            $distance_absolute_values = $distance_absolute_values * (-1);
                        }
                        $sumOf_distance_absolute_values = $sumOf_distance_absolute_values + $distance_absolute_values;

                        //najde jestli je kriterio klicove:
                        $criterion = Criterion::find($projectCriteriaValue->criterion_id);
                        $isKey = $criterion !== null && $criterion->is_key;
                        //pokud je kriterium klicove a hodnota $behind_extremes != 0, pak se nejedna o "Pouzitelnou metodiku"
                        if ($isKey && $behind_extremes != 0) {
                            $isOverBorderOfKeyCriteria = $isOverBorderOfKeyCriteria + 1;
                        }

                        //ulozi hodnoty do databaze - zalozi novy radek

                        CriterionEvaluation::create(array(
                            'criterion_id' => $projectCriteriaValue->criterion_id,
                            //'methodology_project_evaluation_id' => DB::table('methodology_project_evaluations')->where('project_evaluation_id', $id_eva)->pluck('id'),
                            'methodology_project_evaluation_id' => $methodologyProjectEvaluation->id,
                            'criterion_evaluation' => $projectCriteriaValue->value,
                            'behind_extremes' => $behind_extremes,
                            'distance_from_optimum' => $distance_from_optimum,
                            'distance_absolute_values' => $distance_absolute_values
                        ));


                    }//foreach $projectCriteriaValues

                    //updatuje zaznam o sumu
                    MethodologyProjectEvaluation::where([
                        ["project_evaluation_id", $id_eva],
                        ["methodology_id", $methodology->id]//potreba rict spravne
                    ])->update([
                        "value" => $sumOf_distance_absolute_values,//spravne se tam zapise
                    ]);

                    //je za hranixemi klicovych kriterii?
                    if ($isOverBorderOfKeyCriteria === 0) {
                        MethodologyProjectEvaluation::where([
                            ["project_evaluation_id", $id_eva],
                            ["methodology_id", $methodology->id]
                        ])->update([
                            "type" => 'Použitelná metodika',
                        ]);
                        $n = $n + 1;
                    }

                }//foreach $methodologies - po projeti jsou metodiky vyhodnoceny dle hodnot vyberovych kriterii

                //status opet jedna, at muzeme zapsat dalsi
                Project::where([
                    ["id", $projectId],
                    ["user_id", $userId]
                ])->update([
                    "status" => Project::STATUS_OK,
                ]);

                if ($n === 0) {
                    //$message = 'Pro dané hodnoty neexistuje použitelná metodika. Bonusový case ;-) V Analýze není :))';
                    $message = trans("evaluation.numberOfMethodologiesFound", ['n' => $n]);
                } elseif ($n === 1) {
                    //$message = 'Byla nalezena jedna metodika';
                    $message = trans("evaluation.numberOfMethodologiesFound", ['n' => $n]);

                    MethodologyProjectEvaluation::where([
                        ["project_evaluation_id", $id_eva],
                        ["type", 'Použitelná metodika']
                    ])->update([
                        "type" => 'Doporučená metodika',
                    ]);
                } else {//zde je serazeni kriterii a urceni nejnizsi jako doporucene

                    $message = trans("evaluation.numberOfMethodologiesFound", ['n' => $n]);

                    $minimum = 100000;
                    $choices = MethodologyProjectEvaluation::where('project_evaluation_id', $id_eva)
                        ->where('type', 'Použitelná metodika')
                        ->get();
                    //a ted si projdeme ohodnocene metodiky a rekneme si, ktera ma nejlepsi (nejnizsi) hodnoceni = nejmensi odchylky
                    foreach ($choices as $choice) {
                        if ($minimum > $choice->value) {
                            $minimum = $choice->value;
                        }
                    }
                    //ulozeni do tabulky
                    MethodologyProjectEvaluation::where([
                        ["project_evaluation_id", $id_eva],
                        ["value", $minimum]
                    ])->update([
                        "type" => 'Doporučená metodika',
                    ]);
                }
            }//end else

            $methodologyProjectEvaluation = MethodologyProjectEvaluation::where('project_evaluation_id', $id_eva)->with("criterion_evaluation")->orderBy('value', 'desc')->get();
            $criterionEvaluation = collect($methodologyProjectEvaluation)->pluck("criterion_evaluation");

            return $this->respond([
                'pocetNalezenychMetodik' => $n,
                'resultMessage' => $message,
                'id_eva' => $id_eva
            ]);
        } else {
            return $this->respond([
                "message" => "Forbidden"
            ], 404);
        }

    }
}

