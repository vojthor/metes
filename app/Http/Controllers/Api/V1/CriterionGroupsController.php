<?php
/**
 * Created by PhpStorm.
 * User: jandoond
 * Date: 09.04.2016
 * Time: 17:22
 */

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests;
use App\Models\CriterionGroup;
use Illuminate\Http\Request;


class CriterionGroupsController extends ApiController
{

    /**
     * List of criteria groups
     *
     * @return mixed
     */
    public function getAll()
    {
        $criterionGroups = CriterionGroup::all();

        return $this->respond([
            'criterionGroups' => $criterionGroups
        ]);
    }

    /**
     * One criterion group by ID
     *
     * @param $id
     * @return mixed
     */
    public function detail($id){

        $criterionGroup = CriterionGroup::find($id);

        return $this->respond([
            'criterionGroup' => $criterionGroup
            ]);
    }

    /**
     * Proces pro zalozeni skupiny kriterii
     *
     * @param Request $request
     * @return mixed
     */
    public function post_createNew(Request $request){

        $this->validate($request,[
            'type' => 'required|max:100',
            'name' => 'required|max:100'
        ]);

        $criterionGroup = CriterionGroup::create(array(
                'type' => $request->json('type'),
                'name' => $request->json('name')
        ));

        return $this->respond([
            'criterionGroup' => $criterionGroup
        ]);

    }
}