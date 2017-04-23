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


class UsersController extends ApiController
{
    /**
     * Get currently logged in user.
     *
     * @param  \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function getCurrent(Request $request)
    {
//        $admin = Role::find(1)->first();
//        $request->user()->attachRole($admin);
//        $userLevel = "user",

        $user = $request->user();

        if ($user) {
//            $user->setRole($user->roles() ? $user->roles->first()->name : 'user');
            $user->roles();
            $user->role = $user->roles()->first()->name;


//        var_dump($request->user()->hasRole('admin'));
            return $this->respond([
                "user" => $user,
            ]);
        }

        return $this->respond([
            "user" => null,
        ]);
    }

    /**
     * Log the user out of the application.
     *
     * @return \Illuminate\Http\Response
     */
    public function getLogout()
    {
        Auth::guard()->logout();

        return $this->respond([
            "ok" => true,
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


    public function entrustInit()
    {


        $user = User::find(1)->first();
        $admin = Role::find(1)->first();
        $user->attachRole($admin); // parameter can be an Role object, array, or id


    }


    public function update(Request $request)
    {

        Auth::user()->name = $request->json('name');
        Auth::user()->surname = $request->json('surname');
        Auth::user()->email = $request->json('email');
        Auth::user()->company = $request->json('company');

        Auth::user()->save();

        return $this->respond([
            "succes" => "true"
        ]);
    }

}
