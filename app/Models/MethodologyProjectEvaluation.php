<?php
/**
 * Created by PhpStorm.
 * User: jandoond
 * Date: 26.04.2016
 * Time: 19:02
 */

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class MethodologyProjectEvaluation extends Model{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'methodology_project_evaluations';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'methodology_id',
        'project_evaluation_id',
    ];

    /**
     * RELATIONSHIPS
     */

    /**
     * Get the evaluation of the criteria for evaluated project associated with the methodology project evaluation.
     */
    public function criterion_evaluation() {
        return $this->hasMany(CriterionEvaluation::class,'methodology_project_evaluation_id');
    }

    public function methodology_model() {
        return $this->belongsTo(Methodology::class, 'methodology_id');
    }

    public function project_eval() {
        return $this->belongsTo(ProjectEvaluation::class, 'project_evaluation_id');
    }
}