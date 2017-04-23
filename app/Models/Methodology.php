<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Methodology extends Model {
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'methodologies';


    // Allow to fill anything but id
    protected $guarded = ['id'];

    /**
     * RELATIONSHIPS
     */

    /**
     * Get the methodology criteria values associated with the methodology.
     */
    public function methodology_criteria_values() {
        return $this->hasMany(MethodologyCriteriaValues::class);
    }

    /**
     * Get the project evaluation associated with the methodologies.
     */
    public function project_evaluation() {
        return $this->belongsToMany(ProjectEvaluation::class);
    }

    /**
     * Get the methodology project evaluation associated with the methodology.
     */
    public function methodology_project_evaluation() {
        return $this->hasMany(MethodologyProjectEvaluation::class);
    }

    public function methodologyChosen() {
        $arr = [1,2,3];
//        return count($arr);
        return $this->hasMany(MethodologyProjectEvaluation::class)->where([["type", "Doporučená metodika"]]);
//        return $this->hasMany(MethodologyProjectEvaluation::class)->where([["type", "Doporučená metodika"]])->count();
    }

    public function methodologyUsable() {
        $arr = [1,2,3];
//        return count($arr);
        return $this->hasMany(MethodologyProjectEvaluation::class)->where([["type", "Použitelná metodika"]]);
//        return $this->hasMany(MethodologyProjectEvaluation::class)->where([["type", "Doporučená metodika"]])->count();
    }

    public function methodology_chosen() {
        return $this->hasMany(MethodologiesChosen::class);
    }

    //----------------------------------------------------------------------
    /**
     * Get the projects associated with the methodology.
     */
    public function projects() {
        return $this->belongsToMany(Project::class);
    }

    /**
     * Get the criteria values associated with the methodology.
     */
    public function criteriaValues() {
        return $this->hasMany(CriterionValue::class);
    }

    /**
     * Get the criteria associated with the methodology.
     */
    public function criteria() {
        return $this
            ->belongsToMany(Criterion::class)
            ->withPivot(["optimum", "min", "max", "note"]);
    }

    /**
     * Get the evaluations associated with the methodology.
     */
    public function evaluations() {
        return $this->belongsToMany(ProjectEvaluation::class);
    }
}
