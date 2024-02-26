<?php

namespace App\Models;
use App\Models\UserSurvey;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class merchants_table extends Model
{
    use HasFactory;
    protected $table = 'merchants';

    public function surveys()
    {
        return $this->hasMany(UserSurvey::class, 'merchantId', 'merchantId');
    }

    public function userSurveys()
    {
        return $this->hasMany(UserSurvey::class, 'merchantId');
    }
}
