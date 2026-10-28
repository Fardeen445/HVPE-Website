<?php
require __DIR__ . '/config.php';
$product = (int)($_GET['product'] ?? 0);
$color   = trim($_GET['color'] ?? '');
if (!$product || $color === '') out(['error' => 'product and color are required'], 400);

try {
    $st = db()->prepare('SELECT size, qty FROM stock WHERE product_id = ? AND color = ?');
    $st->execute([$product, $color]);
    out(['sizes' => array_map('intval', array_column($st->fetchAll(), 'qty', 'size'))]);
} catch (Throwable $e) {
    out(['error' => 'Database error'], 500);
}