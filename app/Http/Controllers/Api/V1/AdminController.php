<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use App\Models\Role;
use App\Models\User;
use App\Models\Permission;
use App\Models\ProjectCriterionValue;
use App\Models\Criterion;
use App\Models\Project;


class AdminController extends ApiController
{

    public function getUsersWithData () {

        $allUsers = User::with(["projects","roles"])->get();

        return $this->respond([
            "users" => $allUsers
        ]);
    }

    public function getUsers() {

        $allUsers = User::with("roles")->get();

        return $this->respond([
            "users" => $allUsers
        ]);
    }

    public function setRole(Request $request) {
        $user = User::find($request->json("id"));
        $user->detachRoles($user->roles);
        $role = Role::find($request->json("role"));
        $user->attachRole($role);
        $user->save();
        return $this->respond([
            "response" => "true"
        ]);

    }


    public function getStats($userId)
    {

        $projects = User::find($userId)->projects()->get();

        $statsArray = [];

        foreach ($projects as $project) {

            $statsArray[] = $project->projectEvaluation()->count();


        }


        if (Auth::user()->hasRole('admin') || Auth::id() == $userId) {
            return $this->respond([
                "stats" => $statsArray,
            ]);
        } else {
            return $this->respond([
                "stats" => []
            ]);
        }
    }

}
