<?php

namespace App\Providers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Support\ServiceProvider;
use App\Models\Project;
use App\Models\ProjectCriterionValue;
use App\Models\Criterion;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {

        Project::created(function ($project) {
            $criteria = Criterion::all();

            foreach ($criteria as $criterion){

//                if ($criterion->criterion_group_id == 3 || $criterion->criterion_group_id == 4) {
                    ProjectCriterionValue::create([
                        "criterion_id" => $criterion->id,
                        "project_id" => $project->id,
                        "value" => 0,
                        "weight" => $criterion->weight
                    ]);
//                }
            }
        });

        User::created(function ($user) {
            $roleUser = Role::where('name', "user")->first();
            $user->attachRole($roleUser);
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
