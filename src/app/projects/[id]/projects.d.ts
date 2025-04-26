export type projectData = {
    "id": number,
    "title": string,
    "author": string,
    "history": {
        "created": string,
        "modified": string,
        "shared": string
    },
    "stats": [
        {
            "timestamp": number,
            "views": number,
            "loves": number,
            "favorites": number,
            "remixes": number
        }
    ],
    "last_saved": number,
    "format_version": number
}
