<?php

$files = File::files(base_path().'/resources/lang/' . Lang::locale() . "/");

$locale = Lang::locale();
$messages = [];

foreach ($files as $file) {
    $name = File::name($file);
    $key = "${locale}.${name}";

    $messages[$key] = trans($name);
}
?>

<script>
    window.MetesAppCfg = {!! json_encode([
        "locale" => $locale,
        "messages" => $messages,
        "csrfToken" => csrf_token(),
    ]) !!};
</script>