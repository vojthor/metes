<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model {


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'name',
        'description',
        'status'
    ];

    const STATUS_OK = 1;
    const STATUS_IN_PROGRESS = 2;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'projects';

    use SoftDeletes;

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];

    /**
     * RELATIONSHIPS
     */



    /**
     * Get the project criteria values associated with the project.
     */
    public function getUser() {
        return $this->belongsTo("User");
    }


    /**
     * Get the project criteria values associated with the project.
     */
    public function projectCriteriaValues() {
        return $this->hasMany(ProjectCriteriaValues::class);
    }

    /**
     * Get the project evaluation associated with the project.
     */
    public function projectEvaluation() {
        return $this->hasMany(ProjectEvaluation::class)->with("methodologyProjectEvaluation");
    }

    //----------------------------------------------------------------------

    /**
     * Get the methodologies associated with the project.
     */
    public function methodologies() {
        return $this->belongsToMany(Methodology::class);
    }

    /**
     * Get the criteria associated with the project.
     */
    public function criteria() {
        return $this->belongsToMany(ProjectCriterionValue::class,'project_id')
            ->withPivot(['value', 'weight']);
    }

    public function criteria_values() {

        return $this->hasMany(ProjectCriterionValue::class);

    }
}
