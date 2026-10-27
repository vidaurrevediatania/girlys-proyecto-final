<?php
/**
 * Plugin Name: Girlys · Estilo del blog
 * Description: Colores, tipografía y detalles del blog para que combine con el sitio principal. Se carga siempre (mu-plugin).
 * Version: 1.0
 * Author: Girlys
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('wp_head', function () {
    ?>
<style id="girlys-blog-estilo">
  :root{
    --girlys-fondo:#fdf8f4;
    --girlys-tinta:#2b1b1f;
    --girlys-rosa:#b4566d;
    --girlys-rosa-suave:#f6e3e7;
    --girlys-arena:#efe3d8;
  }
  body{
    background:var(--girlys-fondo);
    color:var(--girlys-tinta);
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
    line-height:1.7;
  }
  h1,h2,h3,h4,.site-title{
    font-family:Georgia,"Times New Roman",serif;
    letter-spacing:-.01em;
    color:var(--girlys-tinta);
  }
  a{color:var(--girlys-rosa)}
  a:hover{color:#8e3f53}
  .site-title a{color:var(--girlys-tinta);text-decoration:none}
  .site-description{color:#7d6b70}
  .main-header-bar{border-bottom:1px solid var(--girlys-arena);background:var(--girlys-fondo)}
  .main-header-menu .menu-link,.ast-builder-menu .menu-link{font-weight:600;font-size:.95rem}
  .ast-primary-header-bar .menu-link:hover{color:var(--girlys-rosa)}
  .entry-title a{text-decoration:none}
  .entry-meta,.ast-meta-single-top{color:#8b767b;font-size:.85rem}
  .wp-block-button__link,.ast-button,.button{
    background:var(--girlys-rosa)!important;
    color:#fff!important;
    border-radius:999px!important;
    padding:.7rem 1.4rem!important;
    font-weight:600!important;
    border:0!important;
  }
  .wp-block-button__link:hover,.ast-button:hover,.button:hover{background:#8e3f53!important}
  .girlys-tarjeta{
    background:#fff;
    border:1px solid var(--girlys-arena);
    border-radius:18px;
    padding:1.4rem 1.5rem;
    height:100%;
  }
  .girlys-tarjeta h3{margin-top:0}
  .girlys-precio{font-weight:700;color:var(--girlys-rosa)}
  .girlys-etiqueta{
    display:inline-block;
    background:var(--girlys-rosa-suave);
    color:#8e3f53;
    border-radius:999px;
    padding:.25rem .8rem;
    font-size:.78rem;
    font-weight:700;
    letter-spacing:.06em;
    text-transform:uppercase;
  }
  .site-footer,.ast-footer-copyright{background:#fff;border-top:1px solid var(--girlys-arena)}
  .ast-small-footer{color:#7d6b70}
  blockquote{
    border-left:3px solid var(--girlys-rosa);
    background:#fff;
    padding:1rem 1.25rem;
    font-style:italic;
  }
  /* La portada ya tiene su propio título grande. */
  body.home .site-content .entry-header{display:none}
  .wp-block-latest-posts{padding-left:0;list-style:none}
  .wp-block-latest-posts li{margin-bottom:1.1rem;padding-bottom:1.1rem;border-bottom:1px solid var(--girlys-arena)}
  .wp-block-latest-posts li:last-child{border-bottom:0}
  .wp-block-latest-posts__post-date{color:#8b767b;font-size:.82rem}
</style>
    <?php
}, 99);

/* Un enlace discreto de vuelta al sitio principal en el pie. */
add_action('astra_footer_after', function () {
    echo '<div style="text-align:center;padding:1.2rem 0"><a href="/" style="font-weight:600;text-decoration:none">&larr; Volver a Girlys</a></div>';
});
