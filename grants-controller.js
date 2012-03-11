/* miss grants controller media type model */
{
  "href" : "...",
  "possible-states" :
  [
    {"door" : ["open","closed"]},
    {"light" : ["on", "off"]},
    {"drawer" : ["open", "closed"]},
    {"panel" : ["open", "closed"]}
  ],
  "current-states" :
  [
    {"name" : "door", "value" : "open"},
    {"name" : "light", "value" : "off"},
    {"name" : "drawer", "value" : "closed"},
    {"name" : "panel", "value" : "closed"}
  ],
  "actions" :
  [
    {"name" : "door", "href": "...", "body" : {"name" : "door", "value" : "closed"}},
    {"name" : "door", "href": "...", "body" : {"name" : "door", "value" : "open"}},
    {"name" : "light", "href": "...", "body" : {"name" : "light", "value" : "on"}},
    {"name" : "light", "href": "...", "body" : {"name" : "light", "value" : "off"}},
    {"name" : "drawer", "href": "...", "body" : {"name" : "drawer", "value" : "closed"}},
    {"name" : "drawer", "href": "...", "body" : {"name" : "drawer", "value" : "open"}},
    {"name" : "panel", "href": "...", "body" : {"name" : "panel", "value" : "closed"}},
    {"name" : "panel", "href": "...", "body" : {"name" : "panel", "value" : "open"}}
  ]
}
