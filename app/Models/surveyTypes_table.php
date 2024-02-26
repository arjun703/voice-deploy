<?php

namespace App\Models;
use App\Models\UserSurvey;
use App\Models\merchants_table;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class surveyTypes_table extends Model
{
    use HasFactory;
    protected $table = 'survey_types';
    protected $fillable = ['surveyTypeId', 'surveyTypeName'];


    // public function surveys()
    // {
    //     return $this->hasMany(UserSurvey::class, 'surveyTypId');
    // }

    public function merchant()
    {
        return $this->belongsTo(merchants_table::class, 'merchantId','merchantId');
    }

    public function userSurveys()
    {
        return $this->hasMany(UserSurvey::class, 'surveyTypId');
    }
}
