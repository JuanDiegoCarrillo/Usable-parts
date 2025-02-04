<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

$conn = new mysqli("localhost", "root", "", "datos");

if ($conn->connect_error) {
    die("❌ Error de conexión: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Verificar que los datos no estén vacíos
    if (empty($username) || empty($password)) {
        die("❌ Error: Usuario o contraseña vacíos.");
    }

    // Encriptar la contraseña
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Insertar en la base de datos
    $sql = "INSERT INTO usuarios (username, password) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        die("❌ Error en la preparación de la consulta: " . $conn->error);
    }

    $stmt->bind_param("ss", $username, $hashed_password);

    if ($stmt->execute()) {
        echo "✅ Registro exitoso. <a href='login.html'>Iniciar sesión</a>";
    } else {
        die("❌ Error al registrar usuario: " . $stmt->error);
    }

    $stmt->close();
}

$conn->close();
?>
