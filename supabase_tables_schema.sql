-- ==========================================================
-- TABLE: companies
-- ==========================================================

CREATE TABLE companies (
    id BIGSERIAL PRIMARY KEY,

    company_name TEXT NOT NULL UNIQUE,

    company_type TEXT,

    headquarters TEXT,

    website TEXT,

    description TEXT,

    logo_url TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================================
-- Indexes
-- ==========================================================

CREATE INDEX idx_companies_name
ON companies(company_name);

-- ==========================================================
-- Auto Update updated_at
-- ==========================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_companies_updated_at
BEFORE UPDATE ON companies
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ==========================================================
-- TABLE: drugs
-- ==========================================================

CREATE TABLE drugs (

    id BIGSERIAL PRIMARY KEY,

    company_id BIGINT NOT NULL,

    drug_name TEXT NOT NULL,

    internal_code TEXT,

    generic_name TEXT,

    molecule_type TEXT,

    target TEXT,

    mechanism_of_action TEXT,

    development_phase TEXT CHECK (
        development_phase IN (
            'Discovery',
            'Preclinical',
            'Phase I',
            'Phase II',
            'Phase III',
            'Filed',
            'Approved',
            'Withdrawn'
        )
    ),

    approval_status TEXT CHECK (
        approval_status IN (
            'Investigational',
            'Approved',
            'Withdrawn',
            'Discontinued'
        )
    ),

    expected_launch_date DATE,

    first_in_class BOOLEAN,

    orphan_designation BOOLEAN,

    fast_track BOOLEAN,

    breakthrough_designation BOOLEAN,

    description TEXT,

    extra_data JSONB DEFAULT '{}'::jsonb,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    updated_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT fk_company
        FOREIGN KEY(company_id)
        REFERENCES companies(id)
        ON DELETE CASCADE
);

-- ==========================================================
-- INDEXES
-- ==========================================================

CREATE INDEX idx_drugs_company
ON drugs(company_id);

CREATE INDEX idx_drugs_phase
ON drugs(development_phase);

CREATE INDEX idx_drugs_name
ON drugs(drug_name);

CREATE INDEX idx_drugs_target
ON drugs(target);

CREATE INDEX idx_drugs_molecule
ON drugs(molecule_type);

-- ==========================================================
-- UPDATED_AT TRIGGER
-- ==========================================================

CREATE TRIGGER trg_drugs_updated_at
BEFORE UPDATE ON drugs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ==========================================================
-- TABLE: drug_indications
-- ==========================================================

CREATE TABLE drug_indications (

    id BIGSERIAL PRIMARY KEY,

    drug_id BIGINT NOT NULL,

    therapeutic_area TEXT NOT NULL,

    cancer_type TEXT NOT NULL,

    indication TEXT NOT NULL,

    biomarker TEXT,

    line_of_therapy TEXT,

    development_phase TEXT CHECK (
        development_phase IN (
            'Discovery',
            'Preclinical',
            'Phase I',
            'Phase II',
            'Phase III',
            'Filed',
            'Approved',
            'Withdrawn'
        )
    ),

    approval_status TEXT CHECK (
        approval_status IN (
            'Investigational',
            'Approved',
            'Withdrawn',
            'Discontinued'
        )
    ),

    market_priority TEXT CHECK (
        market_priority IN (
            'High',
            'Medium',
            'Low'
        )
    ),

    is_primary BOOLEAN DEFAULT FALSE,

    notes TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    updated_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT fk_drug_indication
        FOREIGN KEY (drug_id)
        REFERENCES drugs(id)
        ON DELETE CASCADE
);

-- ==========================================================
-- INDEXES
-- ==========================================================

CREATE INDEX idx_indications_drug
ON drug_indications(drug_id);

CREATE INDEX idx_indications_cancer
ON drug_indications(cancer_type);

CREATE INDEX idx_indications_phase
ON drug_indications(development_phase);

CREATE INDEX idx_indications_biomarker
ON drug_indications(biomarker);

CREATE INDEX idx_indications_therapy
ON drug_indications(therapeutic_area);

-- ==========================================================
-- UPDATED_AT TRIGGER
-- ==========================================================

CREATE TRIGGER trg_drug_indications_updated_at
BEFORE UPDATE ON drug_indications
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ==========================================================
-- TABLE: clinical_trials
-- ==========================================================

CREATE TABLE clinical_trials (

    id BIGSERIAL PRIMARY KEY,

    drug_id BIGINT NOT NULL,

    trial_name TEXT NOT NULL,

    nct_id TEXT UNIQUE,

    sponsor TEXT,

    phase TEXT CHECK (
        phase IN (
            'Phase I',
            'Phase I/II',
            'Phase II',
            'Phase II/III',
            'Phase III',
            'Phase IV'
        )
    ),

    status TEXT CHECK (
        status IN (
            'Not Yet Recruiting',
            'Recruiting',
            'Active, Not Recruiting',
            'Completed',
            'Terminated',
            'Withdrawn',
            'Suspended',
            'Unknown'
        )
    ),

    study_type TEXT CHECK (
        study_type IN (
            'Interventional',
            'Observational',
            'Expanded Access'
        )
    ),

    indication TEXT,

    enrollment INTEGER,

    geography TEXT,

    start_date DATE,

    primary_completion_date DATE,

    completion_date DATE,

    primary_endpoint TEXT,

    result_summary TEXT,

    notes TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    updated_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT fk_trial_drug
        FOREIGN KEY (drug_id)
        REFERENCES drugs(id)
        ON DELETE CASCADE
);

-- ==========================================================
-- INDEXES
-- ==========================================================

CREATE INDEX idx_trials_drug
ON clinical_trials(drug_id);

CREATE INDEX idx_trials_phase
ON clinical_trials(phase);

CREATE INDEX idx_trials_status
ON clinical_trials(status);

CREATE INDEX idx_trials_indication
ON clinical_trials(indication);

CREATE INDEX idx_trials_completion
ON clinical_trials(primary_completion_date);

CREATE INDEX idx_trials_name
ON clinical_trials(trial_name);

-- ==========================================================
-- UPDATED_AT TRIGGER
-- ==========================================================

CREATE TRIGGER trg_clinical_trials_updated_at
BEFORE UPDATE ON clinical_trials
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ==========================================================
-- TABLE: upcoming_events
-- ==========================================================

CREATE TABLE upcoming_events (

    id BIGSERIAL PRIMARY KEY,

    drug_id BIGINT NOT NULL,

    trial_id BIGINT,

    event_name TEXT NOT NULL,

    event_type TEXT NOT NULL CHECK (
        event_type IN (
            'FDA Approval',
            'FDA Submission',
            'PDUFA Date',
            'EMA Decision',
            'ASCO Presentation',
            'ESMO Presentation',
            'AACR Presentation',
            'Topline Results',
            'Interim Analysis',
            'Phase I Initiation',
            'Phase II Initiation',
            'Phase III Initiation',
            'Primary Completion',
            'Clinical Readout',
            'Commercial Launch',
            'Conference Presentation',
            'Investor Event',
            'Other'
        )
    ),

    expected_date DATE,

    actual_date DATE,

    status TEXT CHECK (
        status IN (
            'Upcoming',
            'Completed',
            'Delayed',
            'Cancelled'
        )
    ),

    importance TEXT CHECK (
        importance IN (
            'High',
            'Medium',
            'Low'
        )
    ),

    description TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    updated_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT fk_event_drug
        FOREIGN KEY (drug_id)
        REFERENCES drugs(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_event_trial
        FOREIGN KEY (trial_id)
        REFERENCES clinical_trials(id)
        ON DELETE SET NULL
);

-- ==========================================================
-- INDEXES
-- ==========================================================

CREATE INDEX idx_events_drug
ON upcoming_events(drug_id);

CREATE INDEX idx_events_trial
ON upcoming_events(trial_id);

CREATE INDEX idx_events_expected_date
ON upcoming_events(expected_date);

CREATE INDEX idx_events_status
ON upcoming_events(status);

CREATE INDEX idx_events_type
ON upcoming_events(event_type);

CREATE INDEX idx_events_importance
ON upcoming_events(importance);

-- ==========================================================
-- UPDATED_AT TRIGGER
-- ==========================================================

CREATE TRIGGER trg_upcoming_events_updated_at
BEFORE UPDATE ON upcoming_events
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ==========================================================
-- TABLE: drug_updates
-- ==========================================================

CREATE TABLE drug_updates (

    id BIGSERIAL PRIMARY KEY,

    drug_id BIGINT NOT NULL,

    update_title TEXT NOT NULL,

    update_summary TEXT,

    update_type TEXT CHECK (
        update_type IN (
            'FDA Approval',
            'FDA Submission',
            'Clinical Trial Update',
            'Topline Results',
            'Publication',
            'Conference Presentation',
            'Company Announcement',
            'Label Expansion',
            'Partnership',
            'Acquisition',
            'Safety Update',
            'Other'
        )
    ),

    source TEXT,

    source_url TEXT,

    update_date DATE,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT fk_update_drug
        FOREIGN KEY (drug_id)
        REFERENCES drugs(id)
        ON DELETE CASCADE
);

-- ==========================================================
-- INDEXES
-- ==========================================================

CREATE INDEX idx_updates_drug
ON drug_updates(drug_id);

CREATE INDEX idx_updates_date
ON drug_updates(update_date DESC);

CREATE INDEX idx_updates_type
ON drug_updates(update_type);

CREATE INDEX idx_updates_source
ON drug_updates(source);