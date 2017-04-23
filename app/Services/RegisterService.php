<?php

namespace App\Services;

use App\Models\User;

class RegisterService {
    /**
     */
    public function __construct() {
    }

    /**
     * @param $userData
     * @return string
     */
    public function register($userData) {
        $user = User::create($userData);
    }

    /**
     * @param int $userId
     * @return \App\Models\User $user
     */
    public function verifyById($userId) {
        $user = User::findOrFail($userId);

        return $this->verify($user);
    }

    /**
     * @param string $token
     * @return \App\Models\User $user
     */
    public function verifyByToken($token) {
        $user = User::whereToken($token)->firstOrFail();

        return $this->verify($user);
    }

    /**
     * @param User $user
     * @return User
     */
    protected function verify(User $user) {
        if (!$user->verified) {
            $user->verify();
        };

        return $user;
    }
}
