<?php

namespace App\Models;
use App\Models\UserSurvey;
use App\Models\merchants_table;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class questions_table extends Model
{
    protected $table = 'questions';
    protected $fillable = ['surveyId','questionType','questionId','mcqSubheading','questionText'];

    public function survey()
    {
        return $this->belongsTo(UserSurvey::class, 'surveyId');
    }

    public function merchant()
    {
        return $this->belongsTo(merchants_tables::class, 'merchantId');
    }

    public function userSurvey()
    {
        return $this->belongsTo(UserSurvey::class, 'surveyId', 'id');
    }

    public function responses()
    {
        return $this->hasMany(Response::class, 'questionId');
    }
}
