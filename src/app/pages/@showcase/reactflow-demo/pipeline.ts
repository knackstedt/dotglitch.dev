export const pipeline = {
    "_isUserEditInstance": true,
    "_sourceId": "pipeline:01HTYXM5JWBD5MD8HWTP17YRMX",
    "_userEditing": "knackstedt",
    "group": "default",
    "id": "pipeline:01HVT1GKFY75Z1N0FZY893ZDZ8",
    "label": "My new Pipeline",
    "order": -1,
    "sources": [],
    "stages": [
        {
            "description": "\n",
            "environment": [],
            "id": "pipeline_stage:01HTYXM5SZ9ECM455P3KTMZFC9",
            "jobs": [
                {
                    "artifacts": [],
                    "description": "\n",
                    "environment": [],
                    "id": "pipeline_job:01HTYXM5SZ12NPYND71CNZD53F",
                    "label": "Job 1",
                    "order": 0,
                    "taskGroups": [
                        {
                            "description": "\n",
                            "environment": [],
                            "id": "pipeline_task_group:01HTYXM5SZ765EK0TSQ9EN342V",
                            "label": "Mold plastic",
                            "order": 0,
                            "tasks": [
                                {
                                    "description": "\n",
                                    "environment": [],
                                    "id": "pipeline_task:01HTYXP7CNAYMN3DG8DKV8VH94",
                                    "label": "Task - 1",
                                    "order": 1,
                                    "taskScriptArguments": {
                                        "arguments": "",
                                        "command": ""
                                    }
                                },
                                {
                                    "environment": [],
                                    "id": "pipeline_task:01HTYXQBN9HPWQW6F1Y6KCQJ0E",
                                    "label": "Task - 2",
                                    "order": 2,
                                    "taskScriptArguments": {
                                        "arguments": "",
                                        "command": ""
                                    }
                                }
                            ]
                        },
                        {
                            "description": "\n",
                            "environment": [],
                            "id": "pipeline_task_group:01HTYXQ27R3S96VKK8WF8RA26F",
                            "label": "Task Group - 2",
                            "order": 2,
                            "preTaskGroups": [
                                "pipeline_task_group:01HTYXM5SZ765EK0TSQ9EN342V"
                            ],
                            "tasks": [
                                {
                                    "environment": [],
                                    "id": "pipeline_task:01HTYXR07112HJEC41PJ56G0R4",
                                    "label": "Task - 1",
                                    "order": 1,
                                    "taskScriptArguments": {
                                        "arguments": "",
                                        "command": ""
                                    }
                                }
                            ]
                        },
                        {
                            "description": "\n",
                            "environment": [],
                            "id": "pipeline_task_group:01HTYXQ3HVKQR57P7EYQTH8QPR",
                            "label": "Task Group - 3",
                            "order": 3,
                            "preTaskGroups": [
                                "pipeline_task_group:01HTYXM5SZ765EK0TSQ9EN342V"
                            ],
                            "tasks": [
                                {
                                    "environment": [],
                                    "id": "pipeline_task:01HTYXR11HWZE7YQY3ADGXDESQ",
                                    "label": "Task - 1",
                                    "order": 1,
                                    "taskScriptArguments": {
                                        "arguments": "",
                                        "command": ""
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            "label": "Create clamshell",
            "order": 0,
            "renderMode": "normal",
            "stageTrigger": [],
            "webhooks": []
        },
        {
            "environment": [],
            "id": "pipeline_stage:01HTYXN2F12C91TVYFBQEF5AJD",
            "jobs": [],
            "label": "Create Motor",
            "order": 1,
            "stageTrigger": [],
            "webhooks": []
        },
        {
            "environment": [],
            "id": "pipeline_stage:01HTYXN8C0RJY6EVM4DXG2NKHG",
            "jobs": [],
            "label": "Create Battery",
            "order": 2,
            "stageTrigger": [],
            "webhooks": []
        },
        {
            "environment": [],
            "id": "pipeline_stage:01HTYXNEPX7PR2ZEGQQQZNB7AA",
            "jobs": [],
            "label": "Assemble",
            "order": 3,
            "stageTrigger": [
                "pipeline_stage:01HTYXM5SZ9ECM455P3KTMZFC9",
                "pipeline_stage:01HTYXN2F12C91TVYFBQEF5AJD",
                "pipeline_stage:01HTYXN8C0RJY6EVM4DXG2NKHG"
            ],
            "webhooks": []
        },
        {
            "description": "\n",
            "environment": [],
            "id": "pipeline_stage:01HTYXNQDK7NWCCSTQNSMWZFM1",
            "jobs": [
                {
                    "artifacts": [],
                    "description": "\n",
                    "environment": [],
                    "id": "pipeline_job:01HV3WACNDB8JMT5D6KRAT97YH",
                    "label": "Job 1",
                    "order": 0,
                    "taskGroups": [
                        {
                            "id": "pipeline_task_group:01HV3WACNDGDBYAD077WX2J7ZY",
                            "label": "Task Group 1",
                            "order": 0,
                            "tasks": []
                        }
                    ]
                }
            ],
            "label": "Package & ship",
            "order": 4,
            "stageTrigger": [
                "pipeline_stage:01HTYXNEPX7PR2ZEGQQQZNB7AA"
            ],
            "webhooks": []
        }
    ],
    "state": "paused",
    "@odata.id": "/api/odata/pipeline('pipeline:01HVT1GKFY75Z1N0FZY893ZDZ8')",
    "@odata.editLink": "/api/odata/pipeline('pipeline:01HVT1GKFY75Z1N0FZY893ZDZ8')"
};
