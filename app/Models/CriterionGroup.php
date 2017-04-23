<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CriterionGroup extends Model {
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'criterions_groups';

    protected $fillable = [
        'name',
        'type',
    ];
    /**
     * RELATIONSHIPS
     */

    /**
     * Get the criteria associated with the criterion group.
     */
    public function criteria() {
        return $this->hasMany(Criterion::class);
    }
}
