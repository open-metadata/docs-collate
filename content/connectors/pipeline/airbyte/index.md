---
title: Airbyte
slug: /connectors/pipeline/airbyte
---

{% connectorDetailsHeader
name="Airbyte"
stage="PROD"
platform="OpenMetadata"
availableFeatures=["Pipelines", "Pipeline Status", "Lineage"]
unavailableFeatures=["Owners", "Tags"]
/ %}

In this section, we provide guides and references to use the Airbyte connector.

Configure and schedule Airbyte metadata and profiler workflows from the OpenMetadata UI:

- [Metadata Ingestion](#metadata-ingestion)

{% partial file="/connectors/ingestion-modes-tiles.md" variables={yamlPath: "/connectors/pipeline/airbyte/yaml"} /%}

## Metadata Ingestion

{% partial 
  file="/connectors/metadata-ingestion-ui.md" 
  variables={
    connector: "Airbyte", 
    selectServicePath: "/images/v1.4/connectors/airbyte/select-service.png",
    addNewServicePath: "/images/v1.4/connectors/airbyte/add-new-service.png",
    serviceConnectionPath: "/images/v1.4/connectors/airbyte/service-connection.png",
} 
/%}

{% stepsContainer %}
{% extraContent parentTagName="stepsContainer" %}

#### Connection Details

- **Host and Port**: Pipeline Service Management UI URL

{% /extraContent %}

{% partial file="/connectors/test-connection.md" /%}

{% partial file="/connectors/pipeline/configure-ingestion.md" /%}

{% partial file="/connectors/ingestion-schedule-and-deploy.md" /%}

{% /stepsContainer %}

{% partial file="/connectors/troubleshooting.md" /%}
