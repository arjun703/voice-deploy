<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSurveyFeedback extends Model
{
    use HasFactory;
    protected $table = 'user_surveys_feedback';
    protected $fillable = ['survey_id','survey_rating', 'survey_factor','survey_atomsphere','survey_evaluation'];
}
