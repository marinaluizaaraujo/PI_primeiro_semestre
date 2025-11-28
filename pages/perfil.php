<?php
session_start();

if (!isset($_SESSION["usuario_id"])) {
    header("Location: ../login.html");
    exit;
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meu Perfil - CodeVO</title>

    <link rel="stylesheet" href="../css/perfil.css">
    <link rel="stylesheet" href="../css/nav.css">

    <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.0.3/src/regular/style.css">
    <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.0.3/src/fill/style.css">
</head>
<body>

<nav class="navbar">
        <div class="nav-container">
            <a href="../index.html" class="logo">
                <img src="../img/logo.png" alt="Logo Codevo">
            </a>
            <ul class="nav-menu d-flex mb-0">
                <li><a href="home.html" class="nav-link-active">Home</a></li>
                <li><a href="cursos.html" class="nav-link">Cursos</a></li>
                <li><a href="forum.html" class="nav-link">Fórum</a></li>
                <li><a href="tutoria.html" class="nav-link">Tutoria</a></li>
            </ul>

            <div class="user-icon">
                <a href="perfil.php" class="nav-link"><img src="../img/perfil.png" alt="Perfil"></a>
            </div>
        </div>
    </nav>
    <div class="profile-page">

        <aside class="sidebar">
            <h3 class="sidebar-title">Meu Perfil</h3>
            <div class="user-info-sidebar">
                <div class="profile-pic-sidebar">
                    <i class="ph ph-user" style="font-size: 4rem; color: #FF00A5;"></i>
                </div>
                <p class="user-name">
                <?php echo $_SESSION["usuario_nome"]; ?>
            </p>
                <p class="user-handle">
                @<?php echo explode(" ", strtolower($_SESSION["usuario_nome"]))[0]; ?>
            </p>
            </div>
            <nav class="sidebar-nav">
                <a href="#" class="nav-item active-item">
                    <i class="ph-fill ph-house-simple"></i> Painél Principal
                </a>
                <a href="#" class="nav-item">
                    <i class="ph-fill ph-book-open"></i> Meus Cursos
                </a>
                <a href="#" class="nav-item">
                    <i class="ph-fill ph-archive-box"></i> Inventário
                </a>
                <a href="#" class="nav-item">
                    <i class="ph-fill ph-gear"></i> Configurações
                </a>
                <a href="#" class="nav-item">
                    <i class="ph-fill ph-question"></i> Ajuda
                </a>
            </nav>
            <button class="logout-btn" onclick="window.location.href='../php/logout.php'">
                <i class="ph-fill ph-sign-out"></i> Desconectar-se
            </button>
        </aside>

        <main class="profile-content">
            <section class="personal-info-card">
                <div class="info-group">
                <label>Nome Completo</label>
                <input type="text" value="<?php echo $_SESSION['usuario_nome']; ?>" readonly>
            </div>

            <div class="info-group">
                <label>E-mail</label>
                <input type="email" value="<?php echo $_SESSION['usuario_email']; ?>" readonly>
            </div>

            <div class="info-group">
                <label>Nome de Usuário</label>
                <input type="text" value="@<?php echo explode(' ', strtolower($_SESSION['usuario_nome']))[0]; ?>" readonly>
            </div>

            <div class="info-group">
                <label>Senha</label>
                <input type="password" value="********" readonly>
            </div>
                <div class="actions">
                    <button class="action-btn-cancelar">Cancelar Alteração</button>
                    <button class="action-btn-salvar">Salvar Alteração</button>
                </div>
            </section>

            <aside class="right-column">
                <div class="stack-card">
                    <div class="radar-chart-container">
                        <h1 class="title">
                            <span class="title-s">S</span>tack <span class="title-p">P</span>essoal
                        </h1>

                        <svg id="radarChart" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet"></svg>

                        <div class="labels">
                            <div class="label back-end">Back-End</div>
                            <div class="label front-end">Front-End</div>
                            <div class="label bd">Banco de Dados</div>
                            <div class="label redes">Redes</div>
                            <div class="label os">Sistemas Operacionais</div>
                        </div>
                    </div>
                </div>

                <div class="highlighted-subjects-card">
                    <h3 class="card-title">Matérias Destacadas</h3>
                    <div class="subjects-list">
                        <a href="#" class="subject-tag complete">JAVASCRIPT **COMPLETO**</a>
                        <a href="#" class="subject-tag in-progress">HTML **Em Andamento.**</a>
                        <a href="#" class="subject-tag in-progress">CSS **Em Andamento.**</a>
                        <a href="#" class="subject-tag in-progress">Python **Em Andamento.**</a>
                    </div>
                </div>

                
            </aside>
        </main>
    </div>


    <script src="../js/nav.js"></script>
    <script src="../js/perfil.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

</body>
</html>
