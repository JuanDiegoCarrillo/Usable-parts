<?php
session_start();
ini_set('display_errors', 1);
error_reporting(E_ALL);

$conn = new mysqli("localhost", "root", "", "datos");

if ($conn->connect_error) {
    die("❌ Error de conexión: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    $sql = "SELECT password FROM `usuarios` WHERE username = ?";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        die("❌ Error en la preparación: " . $conn->error);
    }

    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($hashed_password);

    if ($stmt->num_rows > 0) {
        $stmt->fetch();
        if (password_verify($password, $hashed_password)) {
            $_SESSION["username"] = $username;
            echo "<script>alert('✅ Inicio de sesión exitoso.'); window.location.href='index.html';</script>";
        } else {
            echo "<script>alert('❌ Contraseña incorrecta.'); window.location.href='login.html';</script>";
        }
    } else {
        echo "<script>alert('❌ El usuario no existe.'); window.location.href='login.html';</script>";
    }

    $stmt->close();
}

$conn->close();
?>
