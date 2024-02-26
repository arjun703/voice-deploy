<?php

namespace App\Models;
use App\Models\questions_table;
use App\Models\merchants_table;
use App\Models\User;
use App\Models\surveyTypes_table;
use App\Models\responses_table;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSurvey extends Model
{
    use HasFactory;
    protected $table = 'merchant_surveys';
    protected $fillable = ['id','user_id','survey_name', 'survey_channel','comment',
    'rating','restaurant_factors','surveyTypeId','merchantId'];

    public function merchant()
    {
        return $this->belongsTo(merchants_table::class, 'merchantId', 'merchantId');
    }

    public function questions()
    {
        return $this->hasMany(questions_table::class, 'surveyId', 'surveyId');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function surveyType()
    {
        return $this->belongsTo(surveyTypes_table::class, 'surveyTypeId','surveyTypeId');
    }

    public function question()
    {
        return $this->hasMany(questions_table::class, 'surveyId', 'id');
    }

    public function responses()
    {
        return $this->hasMany(responses_table::class, 'surveyId');
    }


    public function questionss()
    {
        return $this->belongsTo(questions_table::class, 'questionId','questionId');
    }

    public function survey()
    {
        return $this->belongsTo(UserSurvey::class,'surveyId');
    }
}
