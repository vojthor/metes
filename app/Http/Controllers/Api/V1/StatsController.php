<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\ProjectCriterionValue;
use App\Models\Criterion;
use App\Models\Project;
use App\Models\ProjectEvaluation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Http\Requests;

class StatsController extends ApiController
{


    public function __construct()
    {
    }


    /**
     * Get all projects.
     *
     * @param  \Illuminate\Http\Request $request
     * @param integer                   $userId
     *
     * @return \Illuminate\Http\Response List of projects
     */
    public function getStats(Request $request)
    {

            $projects = Project::all()->count();
            $evaluations= ProjectEvaluation::all()->count();
            $users= User::all()->count();

            return $this->respond([
                "projects" => $projects,
                "evaluations" => $evaluations,
                "users" => $users
            ]);

    }
}
