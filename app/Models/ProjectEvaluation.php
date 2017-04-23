<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectEvaluation extends Model {
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'project_evaluations';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'project_id',
        'name',
        'description',
    ];

    /**
     * RELATIONSHIPS
     */

    /**
     * Get the methodologies associated with the project.
     */
    public function methodologies() {
        return $this
            ->belongsToMany(Methodology::class);
    }

    /**
     * Get the project criteria values associated with the project.
     */
    public function methodologyProjectEvaluation() {
        return $this->hasMany(MethodologyProjectEvaluation::class)->where('type','!=', null)->with("methodology_model");
    }

    /**
     * Get the project associated with the evaluation.
     */
    public function project() {
        return $this->belongsTo(Project::class);
    }

    //-----------------------------------------------------------

    /**
     * Get the methodologies associated with the project.
     */
    /*
    public function methodologies() {
        return $this
            ->belongsToMany(Methodology::class)
            ->withPivot(['type', 'value']);
    }
    */
}
