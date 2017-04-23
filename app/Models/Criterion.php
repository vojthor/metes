<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Criterion extends Model {
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'criterions';

    /**
     * The attributes that are mass assignable.
     *
     * @var ar  ray
     */

    public static $rules = array(
        'criterion_group_id' => 'required|exists:criterion_groups,id',
        'name' => 'required|max:100',
        'description' => 'max:1000',
        'meaning' => 'max:1000',
        'scale' => 'max:1000',
        'weight' => 'digits_between:0,1',
        'status' => 'required|numeric',
        'is_key' => 'required|boolean'
    );

    protected $fillable = [
        'criterion_group_id',
        'name',
        'description',
        'meaning',
        'scale',
        'weight',
        'status',
        'is_key',
    ];
    /**
     * RELATIONSHIPS
     */

    /**
     * Get the project criteria values associated with the criterion.
     */
    public function projectCriteriaValues() {
        return $this->hasMany(ProjectCriterionValue::class,'criterion_id','id');
    }

    /**
     * Get the methodology criteria values associated with the criterion.
     */
    public function methodologyCriteriaValues() {
        return $this->hasMany(MethodologyCriteriaValues::class);
    }

    public function criteriaGroupName() {
        return $this->belongsTo(CriterionGroup::class, 'criterion_group_id')->select(array('id','name as group_name'));
    }

    /**
     * Get the evaluation of the criteria for evaluated project associated with the criterion.
     */
    public function criterionEvaluation() {
        return $this->hasMany(CriterionEvaluation::class);
    }


}
