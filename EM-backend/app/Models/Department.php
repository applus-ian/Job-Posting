<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Department extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'department_assigns';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'parent_department_id',
    ];

    /**
     * Get the parent department of this department.
     */
    public function parentDepartment()
    {
        return $this->belongsTo(Department::class, 'parent_department_id');
    }

    /**
     * Get the sub-departments of this department.
     */
    public function subDepartments()
    {
        return $this->hasMany(Department::class, 'parent_department_id');
    }

    /**
     * Get all employees assigned to this department.
     */
    public function employees()
    {
        return $this->hasMany(Employee::class);
    }
}
