// Copyright (c) 2007-2015, Orbifold bvba.
// 
// For the complete license agreement see http://orbifold.net/EULA or contact us at sales@orbifold.net.
//
// GraphDB JavaScript client library for GraphDB v2015.6

var GraphDB = {

    /*
    Set the API key to access your workspaces and data.
    */
    apiKey: "Of No importance currently",
    serviceURL:"http://graphdb.azurewebsites.net",
    addValue: function (v) {
        return $.ajax({
            url: this.serviceURL + "/AddValue/" + encodeURI(v),
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET",
            error:function(xhr, status, err) { console.log(err); }
        });
    },

    getValue: function (guid) {
        return $.ajax({
            url: this.serviceURL + "/GetValue/" + guid,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    updateValue: function (guid, value) {
        return $.ajax({
            url: this.serviceURL + "/UpdateValue/" + guid + "/" + encodeURI(value),
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    deleteValue: function (guid) {
        return $.ajax({
            url: this.serviceURL + "/DeleteValue/" + guid,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    updateEntity: function (obj) {
        return $.ajax({
            url: this.serviceURL + "/UpdateEntity",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("ApiKey", this.apiKey);
            },
            xhrFields: {
                withCredentials: true
            },
            type: "POST",
            data: JSON.stringify(obj),
            contentType: "application/json;charset=utf-8",
            error: function(xhr, status, err) {
                 console.log(err);
            }
        });
    },

    deleteObject: function (obj) {
        return $.ajax(
            {
                url: this.serviceURL + "/DeleteObject",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("ApiKey", this.apiKey);
                },
                xhrFields: {
                    withCredentials: true
                },
                type: "POST",
                data: JSON.stringify(obj),
                contentType: "application/json;charset=utf-8"
            });
    },

    deleteEntity: function (guid) {
        return $.ajax(
            {
                url: this.serviceURL + "/DeleteEntity/" + guid,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("ApiKey", this.apiKey);
                },
                xhrFields: {
                    withCredentials: true
                },
                type: "GET"
            });
    },

    /***
     * Deletes the link with the given id.
     * @param {guid} The link's unique identifier.
     * @returns {*}
     */
    deleteLink: function (guid) {
        return $.ajax(
            {
                url: this.serviceURL + "/DeleteConnection/" + guid,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("ApiKey", this.apiKey);
                },
                xhrFields: {
                    withCredentials: true
                },
                type: "GET"
            });
    },

    deleteNode: function (guid) {
        return $.ajax(
            {
                url: this.serviceURL + "/DeleteNode/" + guid,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("ApiKey", this.apiKey);
                },
                xhrFields: {
                    withCredentials: true
                },
                type: "GET"
            });
    },

    entityExists: function (guid) {
        return $.ajax(
            {
                type: "GET",
                url: this.serviceURL + "/EntityExists/" + guid,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("ApiKey", this.apiKey);
                },
                xhrFields: {
                    withCredentials: true
                }
            });
    },

    getNode: function (guid) {
        return $.ajax({
            type: "GET",
            url: this.serviceURL + "/GetNode/" + guid,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("ApiKey", this.apiKey);
            },
            xhrFields: {
                withCredentials: true
            }
        });
    },

    getEntity: function (guid) {
        return $.ajax({
            type: "GET",
            url: this.serviceURL + "/GetEntity/" + guid,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("ApiKey", this.apiKey);
            },
            xhrFields: {
                withCredentials: true
            }
        });
    },

    getEntityWorkspaceName: function (guid) {
        return $.ajax({
            type: "GET",
            url: this.serviceURL + "/GetEntityWorkspaceName/" + guid,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("ApiKey", this.apiKey);
            },
            xhrFields: {
                withCredentials: true
            }
        });
    },

    takeRandomEntity: function () {
        return $.ajax({
            type: "GET",
            url: this.serviceURL + "/TakeRandomEntity/",
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            }
        });
    },

    findNode: function (term, type) {
        if (GraphDB.isUndefined(term)) {
            throw "No term given to search for.";
        }
        if (term.indexOf("$") < 0) {
            term += "$";
        }
        if (GraphDB.isUndefined(type)) {
            type = "";
        }
        else {
            type = "/" + type;
        }
        return $.ajax({
            type: "GET",
            url: this.serviceURL + "/FindNode/" + term + type,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            }
        });
    },

    updateObject: function (obj) {
        return $.ajax({
            url: this.serviceURL + "/UpdateObject",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("ApiKey", this.apiKey);
            },
            xhrFields: {
                withCredentials: true
            },
            type: "POST",
            data: JSON.stringify(obj),
            contentType: "application/json;charset=utf-8"
        });
    },

    /***
     * Adds an entity to the current workspace.
     * @param {json} For example;
     *
     *      {
     *          Title: "A new entity",
     *          Description: "Some info here"
     *      }
     * With type information:
     *
     *      {
     *          Title: "John Field",
     *          Description: "Such a great composer",
     *          FirstName: "John",
     *          LastName: "Field"
     *          $type$: "Person"
     *      }
     * @returns {guid} The id of the new entity.
     */
    addEntity: function (obj) {
        return $.ajax({
            url: this.serviceURL + "/AddEntity",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("ApiKey", this.apiKey);
            },
            xhrFields: {
                withCredentials: true
            },
            type: "POST",
            data: JSON.stringify(obj),
            contentType: "application/json;charset=utf-8"
        });
    },

    addNode: function (obj) {
        return $.ajax({
            url: this.serviceURL + "/AddNode",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("ApiKey", this.apiKey);
            },
            xhrFields: {
                withCredentials: true
            },
            type: "POST",
            data: JSON.stringify(obj),
            contentType: "application/json;charset=utf-8"
        });
    },

    // -----------------------------------------------------------------------

    biConnect: function (obj) {
        return $.ajax({
            url: this.serviceURL + "/BiConnect",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("ApiKey", this.apiKey);
            },
            xhrFields: {
                withCredentials: true
            },
            type: "POST",
            data: JSON.stringify(obj),
            contentType: "application/json;charset=utf-8"
        });
    },

    connect: function (obj) {
        return $.ajax({
            url: this.serviceURL + "/Connect",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("ApiKey", this.apiKey);
            },
            xhrFields: {
                withCredentials: true
            },
            type: "POST",
            data: JSON.stringify(obj),
            contentType: "application/json;charset=utf-8"
        });
    },

    getNeighbors: function (obj) {
        return $.ajax({
            url: this.serviceURL + "/GetNeighbors",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("ApiKey", this.apiKey);
            },
            xhrFields: {
                withCredentials: true
            },
            type: "POST",
            data: JSON.stringify(obj),
            contentType: "application/json;charset=utf-8"
        });
    },

    getConnections: function (obj) {
        return $.ajax({
            url: this.serviceURL + "/GetConnections",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("ApiKey", this.apiKey);
            },
            xhrFields: {
                withCredentials: true
            },
            type: "POST",
            data: JSON.stringify(obj),
            contentType: "application/json;charset=utf-8"
        });
    },

    getConnection: function (guid) {
        return $.ajax({
            type: "GET",
            url: this.serviceURL + "/GetConnection/" + guid,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("ApiKey", this.apiKey);
            },
            xhrFields: {
                withCredentials: true
            }
        });
    },

    fullTextSearch: function (searchTerm) {

        return $.ajax({
            type: "GET",
            url: this.serviceURL + "/FullTextSearch/" + searchTerm,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("ApiKey", this.apiKey);
            },
            xhrFields: {
                withCredentials: true
            }
        });
    },

    getRelated: function (guid) {
        return $.ajax({
            type: "GET",
            url: this.serviceURL + "/GetRelated/" + guid,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("ApiKey", this.apiKey);
            },
            xhrFields: {
                withCredentials: true
            }
        });
    },

    getGraph: function (guid) {
        return $.ajax({
            type: "GET",
            url: this.serviceURL + "/GetGraph/" + guid,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("ApiKey", this.apiKey);
            },
            xhrFields: {
                withCredentials: true
            }
        });
    },

    simpleSearchWithResolution: function (searchTerm, dataType) {
        return $.ajax({
            type: "GET",
            url: this.serviceURL + "/SimpleSearchWithResolution/" + searchTerm + "/" + dataType,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("ApiKey", this.apiKey);
            },
            xhrFields: {
                withCredentials: true
            }
        });
    },

    simpleSearch: function (searchTerm, dataType) {
        if (GraphDB.isUndefined(searchTerm)) {
            throw "No search term specified.";
        }
        else {
            searchTerm = searchTerm.replace("*", "$");
        }
        if (GraphDB.isDefined(dataType)) {
            dataType = "/" + dataType;
        }
        else {
            dataType = "";
        }

        return $.ajax({
            type: "GET",
            url: this.serviceURL + "/SimpleSearch/" + searchTerm + dataType,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("ApiKey", this.apiKey);
            },
            xhrFields: {
                withCredentials: true
            }
        });
    },

    getChildren: function (guid, title, type) {

        title = GraphDB.isUndefined(title) ? "" : "/" + title;
        type = GraphDB.isUndefined(type) ? "" : "/" + type;

        return $.ajax({
            type: "GET",
            url: this.serviceURL + "/GetChildren/" + guid + title + type,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("ApiKey", this.apiKey);
            },
            xhrFields: {
                withCredentials: true
            }
        });
    },

    bft: function (startId, endId) {

        endId = GraphDB.isUndefined(endId) ? "" : "/" + endId;

        return $.ajax({
            type: "GET",
            url: this.serviceURL + "/BFT/" + startId + endId,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("ApiKey", this.apiKey);
            },
            xhrFields: {
                withCredentials: true
            }
        });
    },

    dft: function (startId, endId) {

        endId = GraphDB.isUndefined(endId) ? "" : "/" + endId;

        return $.ajax({
            type: "GET",
            url: this.serviceURL + "/BFT/" + startId + endId,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("ApiKey", this.apiKey);
            },
            xhrFields: {
                withCredentials: true
            }
        });
    },

    dijkstra: function (startId, endId) {

        endId = GraphDB.isUndefined(endId) ? "" : "/" + endId;

        return $.ajax({
            type: "GET",
            url: this.serviceURL + "/Dijkstra/" + startId + endId,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("ApiKey", this.apiKey);
            },
            xhrFields: {
                withCredentials: true
            }
        });
    },

    disconnect: function (id1, id2, both) {
        if (GraphDB.isDefined(both)) {
            both = "/" + both;
        }
        else {
            both = "";
        }
        return $.ajax({
            type: "GET",
            url: this.serviceURL + "/Disconnect/" + id1 + "/" + id2 + both,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("ApiKey", this.apiKey);
            },
            xhrFields: {
                withCredentials: true
            }
        });
    },

    topologicalSorting: function (workspaceId) {
        return $.ajax({
            type: "GET",
            url: this.serviceURL + "/TopologicalSorting/" + workspaceId,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("ApiKey", this.apiKey);
            },
            xhrFields: {
                withCredentials: true
            }
        });
    },

    getParents: function (guid, title, type) {

        title = GraphDB.isUndefined(title) ? "" : "/" + title;
        type = GraphDB.isUndefined(type) ? "" : "/" + type;

        return $.ajax({
            type: "GET",
            url: this.serviceURL + "/GetParents/" + guid + title + type,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("ApiKey", this.apiKey);
            },
            xhrFields: {
                withCredentials: true
            }
        });
    },

    areConnected: function (guid1, guid2) {
        return $.ajax({
            type: "GET",
            url: this.serviceURL + "/AreConnected/" + guid1 + "/" + guid2,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("ApiKey", this.apiKey);
            },
            xhrFields: {
                withCredentials: true
            }
        });
    },

    getWorkspaceHomeGraph: function (workspaceId) {

        return $.ajax({
            type: "GET",
            url: this.serviceURL + "/GetWorkspaceHomeGraph/" + workspaceId,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("ApiKey", this.apiKey);
            },
            xhrFields: {
                withCredentials: true
            }
        });
    },

    updateGraph: function (obj) {
        return $.ajax({
            url: this.serviceURL + "/UpdateGraph",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("ApiKey", this.apiKey);
            },
            xhrFields: {
                withCredentials: true
            },
            type: "POST",
            data: JSON.stringify(obj),
            contentType: "application/json;charset=utf-8"
        });
    },

    // -----------------------------------------------------------------------


    importJsonGraph: function (obj) {
        var bucket = {
            graph: obj
        };
        return $.ajax({
            url: this.serviceURL + "/ImportJsonGraph",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("ApiKey", this.apiKey);
            },
            xhrFields: {
                withCredentials: true
            },
            type: "POST",
            data: JSON.stringify(bucket),
            contentType: "application/json;charset=utf-8"
        });
    },

    importShortFormat: function (obj) {
        var bucket = {
            graph: obj
        };
        return $.ajax({
            url: this.serviceURL + "/ImportShortFormat",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("ApiKey", this.apiKey);
            },
            xhrFields: {
                withCredentials: true
            },
            type: "POST",
            data: JSON.stringify(bucket),
            contentType: "application/json;charset=utf-8"
        });
    },

    // -----------------------------------------------------------------------
    addIdToFavorites: function (id) {
        return $.ajax({
            url: this.serviceURL + "/AddIdToFavorites/" + id,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    changeTagName: function (currentName, newName) {
        return $.ajax({
            url: this.serviceURL + "/ChangeTagName/" + currentName + "/" + newName,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    removeFromFavorites: function (id) {
        return $.ajax({
            url: this.serviceURL + "/RemoveFromFavorites/" + id,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    getTagItemsWithoutResolution: function (tag) {
        return $.ajax({
            url: this.serviceURL + "/GetTagItemsWithoutResolution/" + tag,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    getTagEntities: function (tag) {
        return $.ajax({
            url: this.serviceURL + "/GetTagEntities/" + tag,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    getTagNodes: function (tag) {
        return $.ajax({
            url: this.serviceURL + "/GetTagNodes/" + tag,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    getTasks: function () {
        return $.ajax({
            url: this.serviceURL + "/GetTasks/",
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    getPeople: function () {
        return $.ajax({
            url: this.serviceURL + "/GetPeople/",
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    getTags: function () {
        return $.ajax({
            url: this.serviceURL + "/GetTags/",
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    addPredefinedTags: function () {
        return $.ajax({
            url: this.serviceURL + "/AddPredefinedTags/",
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    getItemTags: function (nodeId) {
        return $.ajax({
            url: this.serviceURL + "/GetItemTags/" + nodeId,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    addToTag: function (entityId, tagName) {
        return $.ajax({
            url: this.serviceURL + "/AddToTag/" + entityId + "/" + tagName,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    addTag: function (tagName) {
        return $.ajax({
            url: this.serviceURL + "/AddTag/" + encodeURIComponent(tagName),
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    tagExists: function (tagName) {
        return $.ajax({
            url: this.serviceURL + "/TagExists/" + encodeURIComponent(tagName),
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    deleteTag: function (tagName) {
        return $.ajax({
            url: this.serviceURL + "/DeleteTag/" + encodeURIComponent(tagName),
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    deleteNodesOfTag: function (tagName) {
        return $.ajax({
            url: this.serviceURL + "/DeleteNodesOfTag/" + encodeURIComponent(tagName),
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    removeFromTag: function (entityId, tagName) {
        return $.ajax({
            url: this.serviceURL + "/RemoveFromTag/" + entityId + "/" + encodeURIComponent(tagName),
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    addEntityToFavorites: function (entity) {
        return $.ajax({
            url: this.serviceURL + "/AddEntityToFavorites",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("ApiKey", this.apiKey);
            },
            xhrFields: {
                withCredentials: true
            },
            type: "POST",
            data: JSON.stringify(entity),
            contentType: "application/json;charset=utf-8"
        });
    },

    getFavoritesWithResolution: function () {
        return $.ajax({
            url: this.serviceURL + "/GetFavoritesWithResolution/",
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    getFavorites: function () {
        return $.ajax({
            url: this.serviceURL + "/GetFavorites/",
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    isFavorite: function (id) {
        return $.ajax({
            url: this.serviceURL + "/IsFavorite/" + id,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    // -----------------------------------------------------------------------

    getAllNodesInWorkspace: function (workspaceId) {
        return $.ajax({
            url: this.serviceURL + "/GetAllNodesInWorkspace/" + workspaceId,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    getAllLinksInWorkspace: function (workspaceId) {
        return $.ajax({
            url: this.serviceURL + "/GetAllLinksInWorkspace/" + workspaceId,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    addWorkspace: function (json) {
        return $.ajax({
            url: this.serviceURL + "/AddWorkspace",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("ApiKey", this.apiKey);
            },
            xhrFields: {
                withCredentials: true
            },
            type: "POST",
            data: JSON.stringify(json),
            contentType: "application/json;charset=utf-8"
        });
    },

    updateWorkspace: function (json) {
        return $.ajax({
            url: this.serviceURL + "/UpdateWorkspace",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("ApiKey", this.apiKey);
            },
            xhrFields: {
                withCredentials: true
            },
            type: "POST",
            data: JSON.stringify(json),
            contentType: "application/json;charset=utf-8"
        });
    },

    getWorkspaces: function () {
        return $.ajax({
            url: this.serviceURL + "/GetWorkspaces",
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", GraphDB.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    setActiveWorkspace: function (workspaceId) {
        return $.ajax({
            url: this.serviceURL + "/SetActiveWorkspace/" + workspaceId,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    deleteWorkspace: function (workspaceId) {
        return $.ajax({
            url: this.serviceURL + "/DeleteWorkspace/" + workspaceId,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    setWorkspaceHome: function (entityId) {
        return $.ajax({
            url: this.serviceURL + "/SetWorkspaceHome/" + entityId,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    getWorkspaceHome: function (workspaceId) {
        return $.ajax({
            url: this.serviceURL + "/GetWorkspaceHome/" + workspaceId,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    workspaceExists: function (workspaceId) {
        return $.ajax({
            url: this.serviceURL + "/WorkspaceExists/" + workspaceId,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    setWorkspaceInternal: function (workspaceId, isInternal) {
        return $.ajax({
            url: this.serviceURL + "/SetWorkspaceInternal/" + workspaceId + "/" + isInternal,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    setWorkspacePublic: function (workspaceId, isPublic) {
        return $.ajax({
            url: this.serviceURL + "/SetWorkspacePublic/" + workspaceId + "/" + isPublic,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    setWorkspaceReadOnly: function (workspaceId, isReadOnly) {
        return $.ajax({
            url: this.serviceURL + "/SetWorkspaceReadOnly/" + workspaceId + "/" + isReadOnly,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    getWorkspace: function (workspaceId) {
        return $.ajax({
            url: this.serviceURL + "/GetWorkspace/" + workspaceId,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    getWorkspacesInfo: function () {
        return $.ajax({
            url: this.serviceURL + "/GetWorkspacesInfo/",
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    isWorkspacePublic: function (workspaceId) {
        return $.ajax({
            url: this.serviceURL + "/IsWorkspacePublic/" + workspaceId,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    isWorkspaceUsersWorkspace: function (workspaceId) {
        return $.ajax({
            url: this.serviceURL + "/IsWorkspaceUsersWorkspace/" + workspaceId,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    isSystemWorkspace: function (workspaceId) {
        return $.ajax({
            url: this.serviceURL + "/IsSystemWorkspace/" + workspaceId,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    isWorkspaceReadOnly: function (workspaceId) {
        return $.ajax({
            url: this.serviceURL + "/IsWorkspaceReadOnly/" + workspaceId,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    isWorkspaceInternal: function (workspaceId) {
        return $.ajax({
            url: this.serviceURL + "/IsWorkspaceInternal/" + workspaceId,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    getWorkspaceInfo: function (workspaceId) {
        return $.ajax({
            url: this.serviceURL + "/GetWorkspaceInfo/" + workspaceId,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    getCurrentWorkspace: function () {
        return $.ajax({
            url: this.serviceURL + "/GetCurrentWorkspace/",
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    // -----------------------------------------------------------------------
    getAllUsers: function () {
        return $.ajax({
            url: this.serviceURL + "/GetAllUsers/",
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    findUsers: function (term) {
        return $.ajax({
            url: this.serviceURL + "/FindUsers/" + term,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    findUsersByFriendlyName: function (term) {
        return $.ajax({
            url: this.serviceURL + "/FindUsersByFriendlyName/" + term,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    isSystemAdmin: function (userId) {
        return $.ajax({
            url: this.serviceURL + "/IsSystemAdmin/" + userId,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    grantAccess: function (userIdToGiveAccessto, workspaceId, role) {
        return $.ajax({
            url: this.serviceURL + "/GrantAccess/" + userIdToGiveAccessto + "/" + workspaceId + "/" + role,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    revokeAccess: function (workspaceId, userId) {
        return $.ajax({
            url: this.serviceURL + "/RevokeAccess/" + "/" + workspaceId + "/" + userId,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    hasWorkspaceAccess: function (userId, workspaceId) {
        return $.ajax({
            url: this.serviceURL + "/HasWorkspaceAccess/" + "/" + userId + "/" + workspaceId,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },
    getWorkspaceRole: function (userId, workspaceId) {
        return $.ajax({
            url: this.serviceURL + "/GetWorkspaceRole/" + "/" + userId + "/" + workspaceId,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    isWorkspaceAdmin: function (userId, workspaceId) {
        return $.ajax({
            url: this.serviceURL + "/IsWorkspaceAdmin/" + "/" + userId + "/" + workspaceId,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    getEntityPermissions: function (entityId) {
        return $.ajax({
            url: this.serviceURL + "/GetEntityPermissions/" + "/" + entityId,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    isInScope: function (entityId) {
        return $.ajax({
            url: this.serviceURL + "/IsInScope/" + "/" + entityId,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    getWorkspacePermissions: function (workspaceId) {
        return $.ajax({
            url: this.serviceURL + "/GetWorkspacePermissions/" + "/" + workspaceId,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    getWorkspaceAccessOverview: function (workspaceId) {
        return $.ajax({
            url: this.serviceURL + "/GetWorkspaceAccessOverview/" + "/" + workspaceId,
            beforeSend: function (xhr) { xhr.setRequestHeader("ApiKey", this.apiKey); },
            xhrFields: {
                withCredentials: true
            },
            type: "GET"
        });
    },

    // -----------------------------------------------------------------------

    test: function (obj) {
        return $.ajax({
            url: this.serviceURL + "/Test",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("ApiKey", this.apiKey);
            },
            xhrFields: {
                withCredentials: true
            },
            type: "POST",
            data: JSON.stringify(obj),
            contentType: "application/json;charset=utf-8"
        });
    },

    /*===================================Non-GraphDB utils=================================================*/
    /**
       * Returns a random identifier which can be used as an ID of objects, eventually augmented with a prefix.
       * @returns {string}
       */
    randomId: function (length) {
        if (length === undefined) {
            length = 10;
        }
        // old version return Math.floor((1 + Math.random()) * 0x1000000).toString(16).substring(1);
        var result = "";
        var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (var i = length; i > 0; --i) {
            result += chars.charAt(Math.round(Math.random() * (chars.length - 1)));
        }
        return result;
    },
    /**
    Returns a random guid.
    */
    guid: function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
        }
        return s4() + s4() + "-" + s4() + "-" + s4() + "-" +
          s4() + "-" + s4() + s4() + s4();
    },
    isDefined: function (obj) { return obj !== undefined && obj !== null; },
    isUndefined: function (obj) { return !GraphDB.isDefined(obj); }
};
