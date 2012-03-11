/* miss grants controller media type model */
{
  "controller" :
  {
    "possible-states" :
    [
      "door" : ["open","closed"],
      "light" : ["on", "off"],
      "drawer" : ["open", "closed"],
      "panel" : ["open", "closed"]
    ],
    "current-states" :
    {
      "door" : "open",
      "light" : "off",
      "drawer" : "closed",
      "panel" : "closed"
    },
    "actions" :
    [
      {"door" : {"href": "...", "state" : "closed"}},
      {"door" : {"href": "...", "state" : "open"}},
      {"light" : {"href": "...", "state" : "on"}},
      {"light" : {"href": "...", "state" : "off"}},
      {"drawer" : {"href": "...", "state" : "closed"}},
      {"drawer" : {"href": "...", "state" : "open"}},
      {"panel" : {"href": "...", "state" : "closed"}},
      {"panel" : {"href": "...", "state" : "open"}}
    ]
  }
}