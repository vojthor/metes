<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Zizaco\Entrust\Traits\EntrustUserTrait;


class User extends Authenticatable {

    use EntrustUserTrait; // add this trait to your user model
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'surname',
        'company',
        'city',
        'note',
        'email',
        'password',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function setRole($role) {
        $this->role= $role;
    }

    /**
     * RELATIONSHIPS
     */

    /**
     * Get the projects associated with the user.
     */
    public function projects() {
        return $this->hasMany(Project::class);
    }

    public function projectsWithEval() {
        return $this->hasMany(Project::with("projectEvaluation"));
    }

    public function roles(){
        return $this->belongsToMany(Role::class); //,'assigned_roles'
    }

}
