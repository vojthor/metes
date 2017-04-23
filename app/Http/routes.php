<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

use Illuminate\Contracts\Auth\Guard;

Route::group(['middleware' => ['web']], function () {
    Route::get('entrust', ["as" => "users.entrustInit", "uses" => 'Api\V1\UsersController@entrustInit']);
    Route::group(["prefix" => "api"], function () {
        // V1
        Route::group(["prefix" => "v1"], function () {
            // Users
            Route::group(["prefix" => "users"], function () {
                Route::get('current', ["as" => "users.getCurrent", "uses" => 'Api\V1\UsersController@getCurrent']);
                Route::post('login', ["as" => "users.postLogin", "uses" => 'Api\V1\AuthController@postLogin']);
                Route::post('register', ["as" => "users.postRegister", "uses" => 'Api\V1\AuthController@postRegister']);
                Route::get('logout', ["as" => "users.getLogout", "uses" => 'Api\V1\UsersController@getLogout']);
                Route::post('save', ["as" => "users.save", "uses" => 'Api\V1\UsersController@update']);

                Route::group(["prefix" => "{userId}"], function () {

                    // User projects
                    Route::group(["prefix" => "projects"], function () {
                        Route::get('', ["as" => "projects.getAll", "uses" => 'Api\V1\ProjectsController@getAll']);
                        Route::get('/evaluations', ["as" => "projects.getAllEval", "uses" => 'Api\V1\ProjectsController@getAllEvals']);
                        Route::post('', ["as" => "projects.create", "uses" => 'Api\V1\ProjectsController@create']);

                        Route::group(["prefix" => "{projectId}"], function () {
                            Route::get('', ["as" => "projects.getOne", "uses" => 'Api\V1\ProjectsController@getOne']);
                            Route::put('', ["as" => "projects.update", "uses" => 'Api\V1\ProjectsController@update']);
                            Route::delete('', ["as" => "projects.delete", "uses" => 'Api\V1\ProjectsController@delete']);

                            //evaluate project
                            Route::get('evaluate', ["as" => "projects.evaluate", "uses" => 'Api\V1\EvaluationController@evaluateProject']);


                            //project criteria values
                            Route::group(["prefix" => "project-criteria"], function () {
                                Route::get('', ["as" => "projectsCriteria.getAll", "uses" => 'Api\V1\ProjectsController@getCriteriaValues']);
                                Route::put('', ["as" => "projectsCriteria.update", "uses" => 'Api\V1\ProjectsController@setCriteriaValues']);
                                Route::post('', ["as" => "projectsCriteria.create", "uses" => 'Api\V1\ProjectsController@createCriteriaValues']);
                            });
                            // evaluated projects
                            Route::group(["prefix" => "evaluations"], function () {
                                Route::get('', ["as" => "project.evaluate.getAll", "uses" => 'Api\V1\EvaluationController@getAll']);
                                Route::group(["prefix" => "{projectEvaluateId}"], function () {
                                    Route::get('/', ["as" => "project.evaluate.getOne", "uses" => 'Api\V1\EvaluationController@detail']);
                                });
                            });
                        });
                        // TODO: probably more routes
                    });
                    Route::get('stats', ["as" => "user.stats", "uses" => 'Api\V1\UsersController@getStats']);

                });
            });

            // Methodologies
            Route::group(["prefix" => "methodologies"], function () {
                Route::get('', ["as" => "methodologies.getAll", "uses" => 'Api\V1\MethodologiesController@getAll']);
                Route::post('', ["as" => "methodologies.create", "uses" => 'Api\V1\MethodologiesController@create']);

                Route::group(["prefix" => "{methodologyId}"], function () {
                    Route::get('', ["as" => "methodologies.getOne", "uses" => 'Api\V1\MethodologiesController@getOne']);
                    Route::post('', ["as" => "methodologies.edit", "uses" => 'Api\V1\MethodologiesController@create']);

                });
                // TODO: probably more routes
            });

            // CriterionGroups
            Route::group(["prefix" => "criterion-groups"], function () {
                Route::get('/', ["as" => "criterionGroups.getAll", "uses" => 'Api\V1\CriterionGroupsController@getAll']);
                Route::post('create-criterion-group', ["uses" => 'Api\V1\CriterionGroupsController@post_createNew']);
                Route::group(["prefix" => "{criterionGroupId}"], function () {
                    Route::get('/', ["as" => "criterionGroups.getDetail", "uses" => 'Api\V1\CriterionGroupsController@detail']);
                });
            });

            // Criteria
            Route::group(["prefix" => "criteria"], function () {
                Route::get('/', ["as" => "criteria.getAll", "uses" => 'Api\V1\CriteriaController@getAll']);
                Route::get('/allEmpty', ["as" => "criteria.getAll", "uses" => 'Api\V1\CriteriaController@getEmptyValues']);
                Route::post('create-criterion', ["uses" => 'Api\V1\CriteriaController@post_createNew']);
                Route::group(["prefix" => "{criteriaId}"], function () {
                    Route::get('/', ["as" => "criteria.getDetail", "uses" => 'Api\V1\CriteriaController@detail']);
                });
            });

            // ADMIN
            Route::group(['prefix' => 'admin', 'middleware' => ['role:admin']], function () {
                Route::get('users', ["as" => "admin.getAll", "uses" => 'Api\V1\AdminController@getUsersWithData']);
                Route::post('set-role', ["uses" => 'Api\V1\AdminController@setRole']);
            });

            Route::group(['prefix' => 'stats'], function () {
                Route::get('/', ["as" => "admin.getAll", "uses" => 'Api\V1\StatsController@getStats']);
            });
        });

    });

    // Catch-all route, lets the react router handle the url.
    Route::get('/', function (Guard $auth) {
        if ($auth->check()) {
            return redirect("/app");
        } else {
            return redirect("/login");
        }
    });

    // Catch-all route, lets the react router handle the url.
    Route::get('{url}', function ($url) {
        return view("layouts.defaultLayout", ["url" => $url]);
    })->where('url', '(.*)');
});
