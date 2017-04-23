<?php
/**
 * Created by PhpStorm.
 * User: jandoond
 * Date: 09.04.2016
 * Time: 17:22
 */

namespace App\Http\Controllers\Api\V1;


use App\Http\Requests;
use App\Models\Criterion;
use App\Models\CriterionGroup;
use App\Models\ProjectCriterionValue;
use Illuminate\Http\Request;

class CriteriaController extends ApiController
{

    public function getAll()
    {
        /**
         * List of criteria groups
         *
         * @return mixed
         */
        $criteria = Criterion::with('criteriaGroupName')->get();
        $mapped = $criteria->map(function ($criterion) {
            $criterion->group_name = $criterion->criteriaGroupName->group_name;
            return $criterion;
        });



        return $this->respond([
            'title' => 'Seznam kritérií',
            'criteria' => $mapped
        ]);
    }

    public function getEmptyValues()
    {
        $criterionsValues = Criterion::with('criteriaGroupName')->get();


//        var_dump($criterionsValues);


        $mapped = $criterionsValues->map(function ($value) {
            $value->criterion_name = $value->name;
            $value->group_name = $value->criteriaGroupName->group_name;
            $value->group_id =  $value->criteriaGroupName->id;
            return $value;
        });

        $grouped = [];
        foreach ($mapped as $value) {
            $grouped[$value->group_id][] = $value->toArray();
        }

        return $this->respond([
//            'project_values' => $grouped
            'project_values' => array_reverse($grouped)
        ]);
    }

    /**
     * One criteria by ID
     *
     * @return mixed
     */
    public function detail($id){

        $criterion = Criterion::find($id);

        $criterion->group_name = $criterion->criteriaGroupName->group_name;


        return $this->respond([
            'title' => $criterion->name,
            'criterion' => $criterion,
        ]);
    }

    /**
     * Proces pro zalozeni kriterii
     *
     * @return mixed
     */
    public function post_createNew(Request $request){

        $this->validate($request,[
            'criterion_group_id' => 'required|exists:criterion_groups,id',
            'name' => 'required|max:100',
            'description' => 'max:1000',
            'meaning' => 'max:1000',
            'scale' => 'max:1000',
            'weight' => '',
            'status' => 'required|numeric',
            'is_key' => 'required|boolean'
        ]);

        $criterion = Criterion::create(array(
            'criterion_group_id' => $request->json('criterion_group_id'),
            'name' => $request->json('name'),
            'description' => $request->json('description'),
            'meaning' => $request->json('meaning'),
            'scale' => $request->json('scale'),
            'weight' => $request->json('weight'),
            'status' => $request->json('status'),
            'is_key' => $request->json('is_key')
        ));

        return $this->respond([
            'criterion' => $criterion
        ]);
    }

    /**
     * Proces pro ulozeni hodnot kriterii v projektu
     *
     * @return mixed
     */
    public function setCriteriaValues(Request $request, $projectCriterionId){

        $this->validate($request,[
            'value' => ''
        ]);

        $projectCriterionValue = ProjectCriterionValue::update($projectCriterionId, array(
            'value' => $request->json('value'),
        ));

        return $this->respond([
            '$projectCriterionValue' => $projectCriterionValue
        ]);

    }
}


