<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectCriterionValue extends Model {
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'project_criteria_values';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'criterion_id',
        'project_id',
        'value',
        'weight',
    ];

    /**
     * RELATIONSHIPS
     */

    /**
     * Get the criterion associated with the project criterion value.
     */
    public function criterion() {
        return $this->belongsTo(Criterion::class);
    }

    /**
     * Get the project associated with the project criterion value.
     */
    public function project() {
        return $this->belongsTo(Project::class);
    }
}


