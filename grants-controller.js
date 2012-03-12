/* miss grants controller media type model */

// DSL model from Martin Fowler's book:
// "Domain Specific Languages"

/* processing rules:

  href
    this is the URI of the current representation

  possible-states
    this is the list of states the service
    decided to expose and the possible valid
    values that user-agents can use.

  current-states
    this is the list of current states
    (for the connected user-agent).

  actions
    this is the list of possible actions
    the user-agent can use to manipulate
    the state of the service. note that
    the model shows all the _possible_
    actions, but user-agents will only
    see the ones valid for that user-agent
    at the momemnt (depending on the state
    of the service)

    activating the state is done as follows:
    - use HTTP.PUT
    - use x-www-form-urlencoded
    - use the href as the target URI
    - serialize body exactly (name=door&value=closed)
*/
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
