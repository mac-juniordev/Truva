-- ============================================
-- TRUVA DATABASE - COMPLETE SCHEMA
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- SYSTEM 1: AUTHENTICATION & USERS
-- ============================================

-- Users table - core user accounts
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User profiles - extended user information
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    company VARCHAR(255),
    job_title VARCHAR(255),
    bio TEXT,
    avatar_url VARCHAR(500),
    notification_preferences JSONB DEFAULT '{"email": true, "in_app": true}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Refresh tokens for authentication
CREATE TABLE refresh_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token TEXT NOT NULL UNIQUE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- SYSTEM 2: ANALYSIS ENGINE
-- ============================================

-- Analyses - core analysis records
CREATE TABLE analyses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    content_type VARCHAR(100) NOT NULL,
    content_summary TEXT,
    priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high')),
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Files uploaded for analysis
CREATE TABLE files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    analysis_id UUID REFERENCES analyses(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_size BIGINT NOT NULL,
    file_type VARCHAR(100) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    storage_key VARCHAR(500),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Raw content submissions (for text, links, etc.)
CREATE TABLE content_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    analysis_id UUID REFERENCES analyses(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    content_type VARCHAR(50) NOT NULL CHECK (content_type IN ('text', 'url', 'document', 'image')),
    raw_content TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- SYSTEM 3: ANALYZER PLUGIN ARCHITECTURE
-- ============================================

-- Analyzer registry - all available analyzers
CREATE TABLE analyzers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    analyzer_key VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    version VARCHAR(50) NOT NULL,
    supported_content_types TEXT[] NOT NULL,
    is_active BOOLEAN DEFAULT true,
    requires_api_key BOOLEAN DEFAULT false,
    config JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Analysis results from analyzers
CREATE TABLE analysis_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    analysis_id UUID REFERENCES analyses(id) ON DELETE CASCADE NOT NULL,
    analyzer_id UUID REFERENCES analyzers(id) ON DELETE SET NULL,
    confidence_score DECIMAL(5,2) CHECK (confidence_score >= 0 AND confidence_score <= 100),
    status VARCHAR(50) DEFAULT 'success' CHECK (status IN ('success', 'failed', 'partial')),
    findings JSONB NOT NULL DEFAULT '[]',
    recommendations JSONB NOT NULL DEFAULT '[]',
    metadata JSONB DEFAULT '{}',
    processing_time_ms INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- SYSTEM 4: REPORTS & HISTORY
-- ============================================

-- Reports - user-friendly analysis reports
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    analysis_id UUID REFERENCES analyses(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(255) NOT NULL,
    summary TEXT,
    content TEXT,
    report_type VARCHAR(50) DEFAULT 'standard' CHECK (report_type IN ('standard', 'detailed', 'executive')),
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    download_count INTEGER DEFAULT 0,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Report templates - reusable report formats
CREATE TABLE report_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    template_config JSONB NOT NULL,
    is_default BOOLEAN DEFAULT false,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Analysis history log - audit trail
CREATE TABLE analysis_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    analysis_id UUID REFERENCES analyses(id) ON DELETE CASCADE NOT NULL,
    action VARCHAR(50) NOT NULL,
    previous_status VARCHAR(50),
    new_status VARCHAR(50),
    details JSONB,
    performed_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- SYSTEM 5: DASHBOARD & SYSTEM
-- ============================================

-- User settings
CREATE TABLE user_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    theme VARCHAR(20) DEFAULT 'dark',
    sidebar_collapsed BOOLEAN DEFAULT false,
    default_analyzer_id UUID REFERENCES analyzers(id) ON DELETE SET NULL,
    email_notifications BOOLEAN DEFAULT true,
    in_app_notifications BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- System audit logs
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    resource_id UUID,
    ip_address VARCHAR(45),
    user_agent TEXT,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- Users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_last_login ON users(last_login);

-- Analyses
CREATE INDEX idx_analyses_user_id ON analyses(user_id);
CREATE INDEX idx_analyses_status ON analyses(status);
CREATE INDEX idx_analyses_content_type ON analyses(content_type);
CREATE INDEX idx_analyses_created_at ON analyses(created_at);
CREATE INDEX idx_analyses_user_status ON analyses(user_id, status);

-- Files
CREATE INDEX idx_files_user_id ON files(user_id);
CREATE INDEX idx_files_analysis_id ON files(analysis_id);

-- Analysis Results
CREATE INDEX idx_analysis_results_analysis_id ON analysis_results(analysis_id);
CREATE INDEX idx_analysis_results_analyzer_id ON analysis_results(analyzer_id);
CREATE INDEX idx_analysis_results_confidence_score ON analysis_results(confidence_score);

-- Reports
CREATE INDEX idx_reports_analysis_id ON reports(analysis_id);
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_generated_at ON reports(generated_at);

-- Refresh Tokens
CREATE INDEX idx_refresh_tokens_token ON refresh_tokens(token);
CREATE INDEX idx_refresh_tokens_user_id ON refresh_tokens(user_id);
CREATE INDEX idx_refresh_tokens_expires_at ON refresh_tokens(expires_at);

-- Analysis History
CREATE INDEX idx_analysis_history_analysis_id ON analysis_history(analysis_id);
CREATE INDEX idx_analysis_history_created_at ON analysis_history(created_at);

-- Audit Logs
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_analyses_updated_at BEFORE UPDATE ON analyses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_analyzers_updated_at BEFORE UPDATE ON analyzers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reports_updated_at BEFORE UPDATE ON reports
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_report_templates_updated_at BEFORE UPDATE ON report_templates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_settings_updated_at BEFORE UPDATE ON user_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SEED DATA - DEFAULT ANALYZERS
-- ============================================

INSERT INTO analyzers (analyzer_key, name, description, version, supported_content_types, is_active) VALUES
('document_authenticity', 'Document Authenticity Analyzer', 
 'Analyzes documents for signs of manipulation, forgery, or authenticity issues', 
 '1.0.0', ARRAY['document', 'pdf', 'docx', 'txt'], true),

('spam_detector', 'Spam Content Detector', 
 'Identifies spam, phishing, and unwanted content patterns', 
 '1.0.0', ARRAY['text', 'email', 'url'], true),

('link_trust', 'Link Trust Analyzer', 
 'Evaluates the trustworthiness and safety of URLs', 
 '1.0.0', ARRAY['url'], true),

('image_authenticity', 'Image Authenticity Analyzer', 
 'Detects manipulated or AI-generated images', 
 '1.0.0', ARRAY['image', 'jpg', 'png', 'webp'], true);

-- Default system settings
INSERT INTO report_templates (name, description, template_config, is_default) VALUES
('Standard Report', 'Standard analysis report format', 
 '{"sections": ["summary", "findings", "recommendations", "score"]}', true),

('Executive Report', 'High-level report for executives', 
 '{"sections": ["executive_summary", "trust_score", "key_findings", "action_items"]}', false);

-- ============================================
-- VIEWS FOR DASHBOARD
-- ============================================

-- User dashboard summary view
CREATE OR REPLACE VIEW user_dashboard_summary AS
SELECT 
    u.id as user_id,
    COUNT(DISTINCT a.id) as total_analyses,
    COUNT(DISTINCT CASE WHEN a.status = 'completed' THEN a.id END) as completed_analyses,
    COUNT(DISTINCT CASE WHEN a.status = 'pending' THEN a.id END) as pending_analyses,
    COALESCE(AVG(ar.confidence_score), 0) as average_trust_score,
    COUNT(DISTINCT f.id) as total_files
FROM users u
LEFT JOIN analyses a ON u.id = a.user_id
LEFT JOIN analysis_results ar ON a.id = ar.analysis_id
LEFT JOIN files f ON a.id = f.analysis_id
GROUP BY u.id;

-- Recent analyses with results view
CREATE OR REPLACE VIEW recent_analyses_view AS
SELECT 
    a.id,
    a.title,
    a.status,
    a.content_type,
    a.created_at,
    ar.confidence_score,
    ar.findings,
    ar.recommendations,
    u.full_name as user_name
FROM analyses a
LEFT JOIN analysis_results ar ON a.id = ar.analysis_id
LEFT JOIN users u ON a.user_id = u.id
WHERE a.status = 'completed'
ORDER BY a.created_at DESC
LIMIT 50;