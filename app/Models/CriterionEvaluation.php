<?php
/**
 * Created by PhpStorm.
 * User: jandoond
 * Date: 26.04.2016
 * Time: 19:04
 */

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class CriterionEvaluation extends Model{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'criterion_evaluations';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'criterion_id',
        'methodology_project_evaluation_id',
        'behind_extremes',
        'criterion_evaluation',
        'distance_from_optimum',
        'distance_absolute_values',
    ];

    /**
     * RELATIONSHIPS
     */

    public function criterion_evaluation() {
        return $this->hasMany(CriterionEvaluation::class)->belongsTo(Criterion::class, 'criterion_id');
    }
}