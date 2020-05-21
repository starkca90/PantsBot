module.exports = {
    testcard: {
        "contentType": "application/vnd.microsoft.card.adaptive",
        "content": {
            "type": "AdaptiveCard",
            "body": [
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "items": [
                                {
                                    "type": "Image",
                                    "style": "Person",
                                    "url": "https://developer.webex.com/images/webex-teams-logo.png",
                                    "size": "Medium",
                                    "height": "50px"
                                }
                            ],
                            "width": "auto"
                        },
                        {
                            "type": "Column",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "Cisco Webex Teams",
                                    "weight": "Lighter",
                                    "color": "Accent"
                                },
                                {
                                    "type": "TextBlock",
                                    "weight": "Bolder",
                                    "text": "Buttons and Cards Release",
                                    "horizontalAlignment": "Left",
                                    "wrap": true,
                                    "color": "Light",
                                    "size": "Large",
                                    "spacing": "Small"
                                }
                            ],
                            "width": "stretch"
                        }
                    ]
                },
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "width": 35,
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "Release Date:",
                                    "color": "Light"
                                },
                                {
                                    "type": "TextBlock",
                                    "text": "Product:",
                                    "weight": "Lighter",
                                    "color": "Light",
                                    "spacing": "Small"
                                },
                                {
                                    "type": "TextBlock",
                                    "text": "OS:",
                                    "weight": "Lighter",
                                    "color": "Light",
                                    "spacing": "Small"
                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "width": 65,
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "${test}",
                                    "color": "Light"
                                },
                                {
                                    "type": "TextBlock",
                                    "text": "Webex Teams",
                                    "color": "Light",
                                    "weight": "Lighter",
                                    "spacing": "Small"
                                },
                                {
                                    "type": "TextBlock",
                                    "text": "Mac, Windows, Web",
                                    "weight": "Lighter",
                                    "color": "Light",
                                    "spacing": "Small"
                                }
                            ]
                        }
                    ],
                    "spacing": "Padding",
                    "horizontalAlignment": "Center"
                },
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "width": "auto",
                            "items": [
                                {
                                    "type": "Image",
                                    "altText": "",
                                    "url": "https://developer.webex.com/images/link-icon.png",
                                    "size": "Small",
                                    "width": "30px"
                                }
                            ],
                            "spacing": "Small"
                        },
                        {
                            "type": "Column",
                            "width": "auto",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "[Developer Portal Buttons and Cards Guide]()",
                                    "horizontalAlignment": "Left",
                                    "size": "Medium"
                                }
                            ],
                            "verticalContentAlignment": "Center",
                            "horizontalAlignment": "Left",
                            "spacing": "Small"
                        }
                    ]
                },
                {
                    "type": "ActionSet",
                    "actions": [
                        {
                            "type": "Action.Submit",
                            "title": "Subscribe to Release Notes",
                            "data": {
                                "subscribe": true
                            }
                        }
                    ],
                    "horizontalAlignment": "Left",
                    "spacing": "None"
                }
            ],
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.2"
        }
    }
}