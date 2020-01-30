<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
        <meta charset="utf-8" />
        <title>GraphDB HTML example</title>
        <script type="text/javascript" src="/downloads/jquery.js"></script>
        <script type="text/javascript" src="/downloads/GraphDB.js"></script>
        <style>
        .output {
        margin: 50px;
        background-color: rgb(239, 250, 255);
        border: 1px solid rgb(142, 176, 186);
        border-radius: 5px;
        padding: 10px;
        max-width: 600px;
        }
        </style>
</head>
<body>
        <div id="results" class="output"></div>
        <script>
        var hello = {
            Title: "Hello world!",
            Description: "From GraphDB to the world, with love."
        }
        $.when(GraphDB.addEntity(hello)).then(function (id) {
            $.when(GraphDB.getEntity(id)).then(function (entity) {
                $("#results").html("<h3>" + entity.Title + "</h3><p>" + entity.Description + "</p>");
        }
        );
        });
        </script>
</body>
</html>
