<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Methodology;
use Illuminate\Http\Request;

use App\Http\Requests;

class MethodologiesController extends ApiController
{
    /**
     * Get all methodologies.
     *
     * @param  \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function getAll(Request $request)
    {
        $methodologies = Methodology::all();
        $methodologies = Methodology::with(["criteriaValues", "criteriaValues.criterion", "criteriaValues.criterion.criteriaGroupName", "methodologyChosen","methodologyUsable"])->get();
//        $methodologiesUsage = Methodology::with("methodology_project_evaluation")->where([["methodology_project_evaluation.type", "Doporučená metodika"]])->get();

        return $this->respond([
            "methodologies" => $methodologies,
//            "methodologiesUsage" => $methodologiesUsage,
        ]);
    }

    /**
     * Get selected methodology with criteria values.
     *
     * @param  \Illuminate\Http\Request $request
     * @param integer                   $methodologyId
     *
     * @return \Illuminate\Http\Response Selected methodology or 404 with the info message
     */
    public function getOne(Request $request, $methodologyId)
    {
        $methodology = Methodology::with(array('criteriaValues', 'criteriaValues.criterion', 'criteriaValues.criterion.criteriaGroupName'))
//        $methodology = Methodology::with(array('criteriaValues','criteriaValues.criterion.criteriaGroupName'))
            ->where([
                ["id", $methodologyId]
            ])->first();

        //check if methodology exist
        if ($methodology === null) {
            return $this->respond([
                "message" => "Methodology does not exist"
            ], 404);
        }

//        var_dump($methodology);

        $mapped = $methodology;
//        $mapped = $methodology->map(function ($methodology) {
//            $methodology->group_name = $criterion->criteriaGroupName->group_name;

        $methodology->criteria_values = $methodology->criteriaValues->map(function ($criteria_value) {
            $criteria_value->group_name = $criteria_value->criterion->criteriaGroupName->group_name;
            return $criteria_value;
        });


//            return $methodology;

//        });

        return $this->respond([
            "methodology" => $mapped
        ]);
    }

    public function create(Request $request, $methodologyId = null)
    {

        $methodology = Methodology::find($methodologyId);

        if (!$methodology) $methodology = new Methodology;

        $methodology->name = $request->json('name');
        $methodology->shortcut = $request->json('shortcut');
        $methodology->version = $request->json('version');
        $methodology->owner = $request->json('owner');
        $methodology->publisher = $request->json('publisher');
        $methodology->licence = $request->json('license');
        $methodology->certificate = $request->json('certificates');
        $methodology->language = $request->json('language');
        $methodology->url = $request->json('url');
        $methodology->description = $request->json('description');
        $methodology->note = $request->json('note');

        $methodology->save();


        return $this->respond([
            "data" => $request->json('name')
        ]);
    }

}
