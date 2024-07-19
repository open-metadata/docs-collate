---
title: Druid
slug: /connectors/database/druid
---

{% connectorDetailsHeader
name="Druid"
stage="PROD"
platform="OpenMetadata"
availableFeatures=["Metadata", "Data Profiler", "Data Quality", "Lineage", "Column-level Lineage", "dbt"]
unavailableFeatures=["Query Usage", "Owners", "Tags", "Stored Procedures"]
/ %}

In this section, we provide guides and references to use the Druid connector.

Configure and schedule Druid metadata and profiler workflows from the OpenMetadata UI:

- [Metadata Ingestion](#metadata-ingestion)
- [Data Profiler](/connectors/ingestion/workflows/profiler)
- [Data Quality](/connectors/ingestion/workflows/data-quality)
- [dbt Integration](/connectors/ingestion/workflows/dbt)

{% partial file="/connectors/ingestion-modes-tiles.md" variables={yamlPath: "/connectors/database/athena/yaml"} /%}

## Metadata Ingestion

{% partial 
  file="/connectors/metadata-ingestion-ui.md" 
  variables={
    connector: "Druid", 
    selectServicePath: "/images/v1.4/connectors/druid/select-service.png",
    addNewServicePath: "/images/v1.4/connectors/druid/add-new-service.png",
    serviceConnectionPath: "/images/v1.4/connectors/druid/service-connection.png",
} 
/%}

{% stepsContainer %}
{% extraContent parentTagName="stepsContainer" %}

#### Connection Details

- **Username**: Specify the User to connect to Druid. It should have enough privileges to read all the metadata.
- **Password**: Password to connect to Druid.
- **Host and Port**: Enter the fully qualified hostname and port number for your Druid deployment in the Host and Port field.
- **Database Name**: Optional name to give to the database in OpenMetadata. If left blank, we will use default as the database name.

{% partial file="/connectors/database/advanced-configuration.md" /%}

{% /extraContent %}

{% partial file="/connectors/test-connection.md" /%}

{% partial file="/connectors/database/configure-ingestion.md" /%}

{% partial file="/connectors/ingestion-schedule-and-deploy.md" /%}

{% /stepsContainer %}

{% partial file="/connectors/troubleshooting.md" /%}

{% partial file="/connectors/database/related.md" /%}
