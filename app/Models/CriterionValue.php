<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class CriterionValue extends Model {

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'methodology_criteria_values';

    /**
     * RELATIONSHIPS
     */

    /**
     * Get the criterion associated with the criterion value.
     */
    public function criterion() {
        return $this->belongsTo(Criterion::class);
    }

}