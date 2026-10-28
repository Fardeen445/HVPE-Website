<?php
const DB_HOST = 'localhost', DB_NAME = 'hvpe', DB_USER = 'root', DB_PASS = '';

header('Content-Type: application/json; charset=utf-8');

function db(): PDO {
    static $pdo;
    return $pdo ??= new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4', DB_USER, DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);
}
function out(array $data, int $code = 200): void {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}