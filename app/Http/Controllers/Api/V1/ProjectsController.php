<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\ProjectCriterionValue;
use App\Models\Criterion;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Http\Requests;

class ProjectsController extends ApiController
{


    public function __construct()
    {
        $this->middleware('auth');
    }

    function permissionCheck($projectUserId)
    {
        return (Auth::user()->hasRole('admin') || (Auth::id() == $projectUserId));
    }

    /**
     * Get all projects.
     *
     * @param  \Illuminate\Http\Request $request
     * @param integer                   $userId
     *
     * @return \Illuminate\Http\Response List of projects
     */
    public function getAll(Request $request, $userId)
    {

        if (Auth::user()->hasRole('admin') || (Auth::id() == $userId)) {
            $user = User::find($userId);
            $projects = ($user) ? $user->projects()->get() : [];

            return $this->respond([
                "projects" => $projects,
            ]);
        } else {
            return $this->respond([
                "message" => "Forbidden"
            ], 404);
        }

    }

    public function getAllEvals(Request $request, $userId)
    {

        $evalArr = [];

        if (Auth::user()->hasRole('admin') || (Auth::id() == $userId)) {
            $user = User::find($userId);
            $projects = ($user) ? $user->projects()->get() : [];

            foreach ($projects as $project) {
                $evalArr[] = $project
                    ->projectEvaluation()
                    ->orderBy('updated_at', 'desc')
                    ->get();
            }

            return $this->respond([
                "projects" => $evalArr,
            ]);

        } else {
            return $this->respond([
                "message" => "Forbidden"
            ], 404);
        }
    }

    /**
     * Get selected project.
     *
     * @param  \Illuminate\Http\Request $request
     * @param integer                   $userId
     * @param integer                   $projectId
     *
     * @return \Illuminate\Http\Response Selected project or 404 with the info message
     */
    public function getOne($userId, $projectId)
    {

        $project = Project::find($projectId);

        if ($this->permissionCheck($project->user_id)) {

            return $this->respond([
                "project" => $project
            ]);

        } else {
            return $this->respond([
                "message" => "Forbidden"
            ], 404);
        }

    }

    /**
     * Create new project and create criteria values of project.
     *
     * @param  \Illuminate\Http\Request $request
     * @param integer                   $userId
     *
     * @return \Illuminate\Http\Response Created project
     */
    public function create(Request $request, $userId)
    {
        $name = $request->json('name');
        $description = $request->json('description');
        $status = true;


        $this->validate($request, [
            'name' => 'bail|required|max:100',
            'description' => 'max:1000'
        ]);

        $project = Project::create([
            "user_id" => $userId,
            "name" => $name,
            "description" => $description,
            "status" => $status
        ]);

        $project->save();

        return $this->respond([
            "project_id" => $project->id
        ]);


    }

    /**
     * Update project.
     *
     * @param  \Illuminate\Http\Request $request
     * @param integer                   $userId
     * @param integer                   $projectId
     *
     * @return \Illuminate\Http\Response Return true on success true or false on failure
     */
    public function update(Request $request, $userId, $projectId)
    {
        $name = $request->json('name');
        $description = $request->json('description');

        $this->validate($request, [
            'name' => 'bail|required|max:100',
            'description' => 'max:1000',
        ]);


        $project = Project::find($projectId);


        if ($this->permissionCheck($project->user_id)) {

            $project->update([
                "name" => $name,
                "description" => $description
            ]);

            return $this->respond([
                "message" => ($project) ? true : false
            ]);
        }

    }

    /**
     * Soft delete of project.
     *
     * @param  \Illuminate\Http\Request $request
     * @param integer                   $userId
     * @param integer                   $projectId
     *
     * @return \Illuminate\Http\Response Return true on success true or false on failure
     */
    public function delete(Request $request, $userId, $projectId)
    {


        $project = Project::find($projectId);

        if ($this->permissionCheck($project->user_id)) {

            $project->delete();

            return $this->respond([
                "message" => ($project) ? true : false
            ]);
        } else {

            return $this->respond([
                "message" => "Forbidden"
            ], 404);

        }

    }

    /**
     * Get criteria values for project
     *
     * @param $projectId
     *
     * @return mixed|string
     */
    public function getCriteriaValues($userId, $projectId)
    {

        $project = Project::find($projectId);

        if ($this->permissionCheck($project->user_id)) {


            $projectValues = ProjectCriterionValue::where([
                ["project_id", $projectId],
            ])->with('criterion.criteriaGroupName')->get();

            //check if project exist
            if ($projectValues === null) {
                return $this->respond([
                    "message" => "Project with this id does not have any values"
                ], 404);
            }

            $mapped = $projectValues->map(function ($value) {
                $value->criterion_name = $value->criterion->name;
                $value->group_name = $value->criterion->criteriaGroupName->group_name;
                $value->group_id = $value->criterion->criteriaGroupName->id;
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

    }

    /**
     * Set criteria values for project
     *
     * @param Request $request
     * @param         $userId
     * @param         $projectId
     *
     * @return mixed|string
     */

    public function createCriteriaValues(Request $request, $userId, $projectId)
    {

        $project = Project::find($projectId);

        if ($this->permissionCheck($project->user_id)) {

            $inputs = $request->all();

            foreach ($inputs as $criteriaId => $value) {
                ProjectCriterionValue::create([
                    ['project_id', $projectId],
                    ['criterion_id', $criteriaId]
                ])->update([
                    'value' => $value,
                ]);
            }

            return $this->respond([
                'projectCriterionValues' => ProjectCriterionValue::where('project_id', $projectId)
            ]);
        }


    }

    public function setCriteriaValues(Request $request, $userId, $projectId)
    {

        $project = Project::find($projectId);

        if ($this->permissionCheck($project->user_id)) {

            $inputs = $request->all();

            foreach ($inputs as $criteriaId => $value) {
                ProjectCriterionValue::where([
                    ['project_id', $projectId],
                    ['criterion_id', $criteriaId]
                ])->update([
                    'value' => $value,
                ]);
            }
            return $this->respond([
                'projectCriterionValues' => ProjectCriterionValue::where('project_id', $projectId)
            ]);
        }
        
    }
}
