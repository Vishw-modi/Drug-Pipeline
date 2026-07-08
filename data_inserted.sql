INSERT INTO companies (company_name, company_type, headquarters, website, description) VALUES
('Merck & Co.', 'Large Pharma', 'Rahway, NJ, USA', 'https://www.merck.com', 'Global biopharmaceutical company and maker of Keytruda (pembrolizumab), the world''s leading oncology immunotherapy by revenue.'),
('AstraZeneca', 'Large Pharma', 'Cambridge, UK', 'https://www.astrazeneca.com', 'Global science-led biopharmaceutical with a broad oncology portfolio spanning EGFR inhibitors, ADCs, immunotherapy, and PARP inhibitors.'),
('Roche', 'Large Pharma', 'Basel, Switzerland', 'https://www.roche.com', 'Pioneer in personalised oncology with a portfolio spanning HER2-targeted therapies, bispecific antibodies, and immuno-oncology.'),
('Pfizer', 'Large Pharma', 'New York, NY, USA', 'https://www.pfizer.com', 'Global pharmaceutical leader with a diversified oncology pipeline including ADCs, small molecules, and bispecific antibodies.'),
('Bristol Myers Squibb', 'Large Pharma', 'Princeton, NJ, USA', 'https://www.bms.com', 'Originator of nivolumab (Opdivo) and ipilimumab (Yervoy); leader in immuno-oncology and cell therapy.'),
('Johnson & Johnson', 'Large Pharma', 'New Brunswick, NJ, USA', 'https://www.jnj.com', 'Broad oncology portfolio through Janssen Oncology including bispecific antibodies, small molecules, and the EGFR/MET bispecific amivantamab.'),
('Novartis', 'Large Pharma', 'Basel, Switzerland', 'https://www.novartis.com', 'Oncology leader with radioligand therapies, CDK inhibitors, CAR-T, and a broad haematology and solid tumour pipeline.'),
('Gilead Sciences', 'Large Pharma', 'Foster City, CA, USA', 'https://www.gilead.com', 'Oncology and inflammation-focused biopharmaceutical; makers of sacituzumab govitecan (Trodelvy) and magrolimab.'),
('AbbVie', 'Large Pharma', 'North Chicago, IL, USA', 'https://www.abbvie.com', 'Research-based biopharmaceutical with oncology assets including venetoclax (Venclexta) in haematologic malignancies.'),
('Daiichi Sankyo', 'Large Pharma', 'Tokyo, Japan', 'https://www.daiichisankyo.com', 'Innovator of the DXd ADC platform; maker of trastuzumab deruxtecan (Enhertu) and a broad pipeline of next-generation ADCs.'),
('Genmab', 'Biotech', 'Copenhagen, Denmark', 'https://www.genmab.com', 'Antibody specialist focused on differentiated antibody therapeutics including bispecifics and ADCs in haematology and oncology.'),
('Regeneron', 'Large Pharma', 'Tarrytown, NY, USA', 'https://www.regeneron.com', 'Biotechnology company with cemiplimab (Libtayo) approved across multiple solid tumours including NSCLC, CSCC, and cervical cancer.'),
('BeiGene', 'Large Pharma', 'Beijing, China / Basel, Switzerland', 'https://www.beigene.com', 'Global oncology company with zanubrutinib (Brukinsa) and tislelizumab across haematology and solid tumours.'),
('Amgen', 'Large Pharma', 'Thousand Oaks, CA, USA', 'https://www.amgen.com', 'Biotechnology pioneer with sotorasib (Lumakras) and tarlatamab (Imdelltra) in thoracic oncology and KRAS-targeted therapy.'),
('BioNTech', 'Biotech', 'Mainz, Germany', 'https://www.biontech.com', 'mRNA oncology innovator with a pipeline spanning cancer vaccines, ADCs, and next-generation immunotherapies.'),
('Summit Therapeutics', 'Biotech', 'Miami, FL, USA', 'https://www.summitplc.com', 'Clinical-stage oncology company developing ivonescimab (SM-88 / AK112 licensed from Akeso) for NSCLC in the United States.'),
('Akeso', 'Biotech', 'Zhongshan, China', 'https://www.akesobio.com', 'Chinese biopharmaceutical originating ivonescimab (AK112), a PD-1/VEGF bispecific, and cadonilimab (AK104), a PD-1/CTLA-4 bispecific.'),
('Exelixis', 'Biotech', 'Alameda, CA, USA', 'https://www.exelixis.com', 'Oncology-focused company with cabozantinib (Cabometyx/Cometriq) approved in RCC, HCC, and thyroid cancer.'),
('Eli Lilly', 'Large Pharma', 'Indianapolis, IN, USA', 'https://www.lilly.com', 'Integrated pharmaceutical with selpercatinib (Retevmo) in RET-altered cancers and imlunestrant in hormone receptor-positive breast cancer.'),
('Sanofi', 'Large Pharma', 'Paris, France', 'https://www.sanofi.com', 'Global pharmaceutical with an emerging oncology pipeline including tusamitamab ravtansine (SAR408701), a CEACAM5-targeting ADC in NSCLC.');

-- company_id reference:
--  1=Merck & Co., 2=AstraZeneca, 3=Roche, 4=Pfizer, 5=Bristol Myers Squibb
--  6=J&J, 7=Novartis, 8=Gilead Sciences, 9=AbbVie, 10=Daiichi Sankyo
-- 11=Genmab, 12=Regeneron, 13=BeiGene, 14=Amgen, 15=BioNTech
-- 16=Summit Therapeutics, 17=Akeso, 18=Exelixis, 19=Eli Lilly, 20=Sanofi

INSERT INTO drugs (company_id, drug_name, internal_code, generic_name, molecule_type, target, mechanism_of_action, development_phase, approval_status, first_in_class, orphan_designation, fast_track, breakthrough_designation, description) VALUES

-- 1. Pembrolizumab (Merck)
(1, 'Pembrolizumab', 'MK-3475', 'Pembrolizumab', 'Monoclonal Antibody', 'PD-1', 'Humanised IgG4 monoclonal antibody that blocks PD-1 receptor, restoring anti-tumour T-cell immunity', 'Approved', 'Approved', FALSE, FALSE, FALSE, FALSE, 'Keytruda; the world''s best-selling oncology drug, approved across 40+ indications spanning NSCLC, melanoma, TNBC, CRC MSI-H, and many others.'),

-- 2. Belzutifan (Merck)
(1, 'Belzutifan', 'MK-6482', 'Belzutifan', 'Small Molecule', 'HIF-2α', 'Oral HIF-2α inhibitor that reduces expression of VEGF, EPO, and other hypoxia-inducible growth factors', 'Approved', 'Approved', TRUE, TRUE, TRUE, TRUE, 'Welireg; first-in-class HIF-2α inhibitor approved for VHL-mutated RCC and, following LITESPARK-005, for previously treated clear-cell RCC.'),

-- 3. Olaparib (AstraZeneca)
(2, 'Olaparib', 'AZD2281', 'Olaparib', 'Small Molecule', 'PARP1/2', 'Oral PARP inhibitor that traps PARP on DNA strand breaks, causing synthetic lethality in BRCA1/2-deficient tumours', 'Approved', 'Approved', TRUE, TRUE, TRUE, FALSE, 'Lynparza; first-in-class PARP inhibitor approved for BRCA-mutated ovarian, breast, pancreatic, and prostate cancers.'),

-- 4. Osimertinib (AstraZeneca)
(2, 'Osimertinib', 'AZD9291', 'Osimertinib', 'Small Molecule', 'EGFR', 'Third-generation oral EGFR TKI with selectivity for EGFR-activating and T790M resistance mutations; CNS penetrant', 'Approved', 'Approved', FALSE, FALSE, TRUE, TRUE, 'Tagrisso; standard of care in EGFR-mutated NSCLC across first-line (FLAURA), adjuvant (ADAURA), and unresectable Stage III (LAURA) settings.'),

-- 5. Durvalumab (AstraZeneca)
(2, 'Durvalumab', 'MEDI4736', 'Durvalumab', 'Monoclonal Antibody', 'PD-L1', 'Human IgG1 monoclonal antibody that blocks PD-L1, preventing binding to PD-1 and CD80 and restoring T-cell activity', 'Approved', 'Approved', FALSE, FALSE, FALSE, FALSE, 'Imfinzi; approved in unresectable Stage III NSCLC (PACIFIC) and extensive-stage SCLC (CASPIAN), with tremelimumab combinations in HCC and biliary tract cancer.'),

-- 6. Rilvegostomig (AstraZeneca)
(2, 'Rilvegostomig', 'AZD7789', NULL, 'Bispecific', 'PD-1/TIM-3', 'Bispecific antibody simultaneously blocking PD-1 and TIM-3 checkpoints to enhance T-cell reinvigoration in the tumour microenvironment', 'Phase III', 'Investigational', FALSE, FALSE, TRUE, TRUE, 'Next-generation bispecific checkpoint inhibitor in Phase III ARTEMIDE-Lung02 for NSCLC; designed to overcome resistance to PD-1 monotherapy.'),

-- 7. Volrustomig (AstraZeneca)
(2, 'Volrustomig', 'AZD2936', NULL, 'Bispecific', 'PD-1/TIGIT', 'Bispecific antibody blocking PD-1 and TIGIT simultaneously, exploiting synergistic checkpoint co-blockade on T and NK cells', 'Phase III', 'Investigational', FALSE, FALSE, FALSE, FALSE, 'Bispecific PD-1/TIGIT in Phase III SAVANNA trial for NSCLC; part of AstraZeneca''s broad next-generation immuno-oncology strategy.'),

-- 8. Mosunetuzumab (Roche)
(3, 'Mosunetuzumab', 'RG7828', 'Mosunetuzumab', 'Bispecific', 'CD20/CD3', 'CD20xCD3 T-cell engaging bispecific antibody that redirects cytotoxic T cells to lyse CD20+ B-cell tumour cells', 'Approved', 'Approved', TRUE, TRUE, TRUE, TRUE, 'Lunsumio; first subcutaneous CD20xCD3 T-cell engager approved for relapsed/refractory follicular lymphoma.'),

-- 9. Tiragolumab (Roche)
(3, 'Tiragolumab', 'RG6058', NULL, 'Monoclonal Antibody', 'TIGIT', 'IgG1 monoclonal antibody blocking TIGIT on T and NK cells, intended to complement PD-L1 blockade with atezolizumab', 'Phase III', 'Investigational', FALSE, FALSE, FALSE, FALSE, 'Anti-TIGIT antibody evaluated in the SKYSCRAPER programme; Phase III SKYSCRAPER-01 in NSCLC and SKYSCRAPER-02 in SCLC did not meet primary endpoints.'),

-- 10. Inavolisib (Roche)
(3, 'Inavolisib', 'GDC-0077', 'Inavolisib', 'Small Molecule', 'PI3Kα', 'Selective oral PI3Kα inhibitor that degrades mutant p110α and blocks the PI3K/AKT/mTOR pathway in PIK3CA-mutated tumours', 'Approved', 'Approved', FALSE, FALSE, TRUE, TRUE, 'Itovebi; approved in combination with palbociclib and fulvestrant for PIK3CA-mutated HR+/HER2- advanced breast cancer following INAVO120.'),

-- 11. Lorlatinib (Pfizer)
(4, 'Lorlatinib', 'PF-06463922', 'Lorlatinib', 'Small Molecule', 'ALK/ROS1', 'Third-generation oral ALK/ROS1 TKI with CNS penetrance, active against broad range of ALK resistance mutations', 'Approved', 'Approved', FALSE, TRUE, TRUE, TRUE, 'Lorbrena; approved as first-line therapy for ALK+ NSCLC (CROWN trial) and second-line after crizotinib; best-in-class CNS activity.'),

-- 12. Elranatamab (Pfizer)
(4, 'Elranatamab', 'PF-06863135', 'Elranatamab', 'Bispecific', 'BCMA/CD3', 'Humanised BCMA×CD3 bispecific antibody directing cytotoxic T cells to BCMA-expressing myeloma cells', 'Approved', 'Approved', FALSE, TRUE, TRUE, TRUE, 'Elrexfio; approved as monotherapy for triple-class exposed relapsed/refractory multiple myeloma based on MagnetisMM-3.'),

-- 13. Nivolumab (Bristol Myers Squibb)
(5, 'Nivolumab', 'MDX-1106', 'Nivolumab', 'Monoclonal Antibody', 'PD-1', 'Fully human IgG4 PD-1 blocking antibody that restores anti-tumour T-cell responses; first approved PD-1 inhibitor', 'Approved', 'Approved', TRUE, FALSE, FALSE, FALSE, 'Opdivo; approved across melanoma, NSCLC, RCC, HCC, gastric, oesophageal, CRC MSI-H, SCLC, HNSCC, and other tumour types; frequently combined with ipilimumab (CheckMate programme).'),

-- 14. Adagrasib (Bristol Myers Squibb)
(5, 'Adagrasib', 'MRTX849', 'Adagrasib', 'Small Molecule', 'KRAS G12C', 'Irreversible covalent KRAS G12C inhibitor that locks KRAS in the inactive GDP-bound state', 'Approved', 'Approved', FALSE, FALSE, TRUE, TRUE, 'Krazati; approved for KRAS G12C-mutated NSCLC (KRYSTAL-1) and in combination with cetuximab for KRAS G12C+ CRC; acquired via BMS-Mirati acquisition (2024).'),

-- 15. Amivantamab (Johnson & Johnson)
(6, 'Amivantamab', 'JNJ-61186372', 'Amivantamab', 'Bispecific', 'EGFR/MET', 'IgG1 EGFR×MET bispecific antibody with antibody-dependent cellular cytotoxicity and antibody-dependent cellular phagocytosis activity', 'Approved', 'Approved', FALSE, FALSE, TRUE, TRUE, 'Rybrevant; approved for NSCLC with EGFR exon 20 insertion mutations (PAPILLON) and in combination with lazertinib for EGFR-mutated NSCLC post-osimertinib (MARIPOSA-2).'),

-- 16. Lazertinib (Johnson & Johnson)
(6, 'Lazertinib', 'JNJ-73841937', 'Lazertinib', 'Small Molecule', 'EGFR', 'Third-generation oral EGFR TKI with selectivity for EGFR-activating and T790M mutations; CNS penetrant', 'Approved', 'Approved', FALSE, FALSE, TRUE, FALSE, 'Lazcluze; approved in combination with amivantamab for first-line EGFR-mutated NSCLC (MARIPOSA) and developed by Yuhan/J&J.'),

-- 17. Capmatinib (Novartis)
(7, 'Capmatinib', 'INC280', 'Capmatinib', 'Small Molecule', 'MET', 'Oral selective MET inhibitor blocking MET kinase activity in METex14-skipping mutated tumours', 'Approved', 'Approved', FALSE, TRUE, TRUE, TRUE, 'Tabrecta; first MET inhibitor approved specifically for METex14-skipping NSCLC; approved in first and subsequent lines (GEOMETRY mono-1).'),

-- 18. Spartalizumab (Novartis)
(7, 'Spartalizumab', 'PDR001', 'Spartalizumab', 'Monoclonal Antibody', 'PD-1', 'Humanised IgG4 PD-1 blocking antibody developed by Novartis for solid tumour combinations', 'Phase II', 'Investigational', FALSE, FALSE, FALSE, FALSE, 'Anti-PD-1 antibody evaluated across multiple solid tumours; Phase III COMBI-i in melanoma did not meet primary endpoint; ongoing investigations in combination regimens.'),

-- 19. Sacituzumab Govitecan (Gilead Sciences)
(8, 'Sacituzumab Govitecan', 'IMMU-132', 'Sacituzumab Govitecan', 'ADC', 'TROP2', 'Anti-TROP2 ADC carrying SN-38 (active irinotecan metabolite) via hydrolysable CL2A linker for sustained tumour exposure', 'Approved', 'Approved', TRUE, FALSE, TRUE, TRUE, 'Trodelvy; approved for TNBC (ASCENT) and HR+/HER2- breast cancer (TROPiCS-02); EVOKE-01 Phase III in NSCLC ongoing.'),

-- 20. Venetoclax (AbbVie)
(9, 'Venetoclax', 'ABT-199', 'Venetoclax', 'Small Molecule', 'BCL-2', 'Highly selective oral BCL-2 inhibitor that displaces pro-apoptotic proteins from BCL-2, restoring apoptosis in haematologic malignancies', 'Approved', 'Approved', TRUE, TRUE, TRUE, TRUE, 'Venclexta; approved in CLL (CLL14, MURANO) and AML (VIALE-A) in combination regimens; foundational agent in haematologic oncology.'),

-- 21. Navitoclax (AbbVie)
(9, 'Navitoclax', 'ABT-263', 'Navitoclax', 'Small Molecule', 'BCL-2/BCL-XL', 'Oral BCL-2 and BCL-XL dual inhibitor extending venetoclax activity to BCL-XL-dependent malignancies', 'Phase III', 'Investigational', FALSE, FALSE, FALSE, FALSE, 'Investigational BCL-2/BCL-XL inhibitor in Phase III TRANSFORM-1 for myelofibrosis in combination with ruxolitinib; thrombocytopaenia limits dosing due to BCL-XL inhibition in platelets.'),

-- 22. Trastuzumab Deruxtecan (Daiichi Sankyo)
(10, 'Trastuzumab Deruxtecan', 'DS-8201', 'Trastuzumab Deruxtecan', 'ADC', 'HER2', 'Anti-HER2 ADC comprising trastuzumab, cleavable tetrapeptide linker, and topoisomerase I inhibitor DXd payload with high DAR (8) and bystander effect', 'Approved', 'Approved', FALSE, FALSE, TRUE, TRUE, 'Enhertu (co-developed/commercialised with AstraZeneca); approved in HER2+ and HER2-low breast cancer, HER2-mutated NSCLC, and HER2+ gastric cancer across multiple DESTINY trials.'),

-- 23. Datopotamab Deruxtecan (Daiichi Sankyo)
(10, 'Datopotamab Deruxtecan', 'DS-1062', 'Datopotamab Deruxtecan', 'ADC', 'TROP2', 'Anti-TROP2 ADC with cleavable linker and DXd topoisomerase I inhibitor payload; differentiated from SG by payload and DAR', 'Phase III', 'Investigational', FALSE, FALSE, TRUE, TRUE, 'Dato-DXd (co-developed/commercialised with AstraZeneca); in Phase III TROPION-Breast01 for HR+/HER2- BC and TROPION-Lung01 for NSCLC; TROPION-Lung08 combination with pembrolizumab ongoing.'),

-- 24. Patritumab Deruxtecan (Daiichi Sankyo)
(10, 'Patritumab Deruxtecan', 'HER3-DXd', 'Patritumab Deruxtecan', 'ADC', 'HER3', 'Anti-HER3 ADC with DXd payload targeting HER3-expressing tumours including EGFR-TKI resistant NSCLC', 'Phase III', 'Investigational', FALSE, FALSE, TRUE, TRUE, 'U3-1402; in Phase III HERTHENA-Lung02 for EGFR-mutated NSCLC after osimertinib and platinum-based chemotherapy; potent activity in EGFR-resistant settings shown in Phase II.'),

-- 25. Ifinatamab Deruxtecan (Daiichi Sankyo)
(10, 'Ifinatamab Deruxtecan', 'DS-7300', 'Ifinatamab Deruxtecan', 'ADC', 'B7-H3', 'Anti-B7-H3 ADC with DXd payload; B7-H3 broadly overexpressed in solid tumours including SCLC, NSCLC, prostate, and breast cancer', 'Phase II', 'Investigational', FALSE, FALSE, TRUE, FALSE, 'I-DXd; Phase II IDeate-Lung01 demonstrating compelling activity in relapsed/refractory SCLC; Phase III planning underway; part of Daiichi Sankyo''s DXd ADC franchise.'),

-- 26. Epcoritamab (Genmab)
(11, 'Epcoritamab', 'GEN3013', 'Epcoritamab', 'Bispecific', 'CD20/CD3', 'Subcutaneous CD20xCD3 DuoBody bispecific antibody redirecting T cells to kill CD20+ B-cell malignancies', 'Approved', 'Approved', FALSE, TRUE, TRUE, TRUE, 'Epkinly (co-developed with AbbVie); approved for relapsed/refractory DLBCL and follicular lymphoma; subcutaneous dosing enables outpatient administration.'),

-- 27. Cemiplimab (Regeneron)
(12, 'Cemiplimab', 'REGN2810', 'Cemiplimab', 'Monoclonal Antibody', 'PD-1', 'Fully human IgG4 PD-1 blocking antibody developed by Regeneron and commercialised with Sanofi', 'Approved', 'Approved', FALSE, FALSE, TRUE, FALSE, 'Libtayo; approved for PD-L1-high NSCLC (EMPOWER-Lung-1), cervical cancer (EMPOWER-Cervical-1), and cutaneous squamous cell carcinoma.'),

-- 28. Zanidatamab (BeiGene)
(13, 'Zanidatamab', 'ZW25', 'Zanidatamab', 'Bispecific', 'HER2', 'Bispecific antibody binding two non-overlapping HER2 epitopes (ECD2 and ECD4), providing superior HER2 clustering and internalisation vs. trastuzumab', 'Filed', 'Investigational', FALSE, TRUE, TRUE, TRUE, 'Bispecific HER2 antibody with FDA sNDA filed for HER2-amplified biliary tract cancer (HERIZON-BTC-01); HERIZON-GEA-01 Phase III in gastric/GEJ cancer ongoing.'),

-- 29. Tislelizumab (BeiGene)
(13, 'Tislelizumab', 'BGB-A317', 'Tislelizumab', 'Monoclonal Antibody', 'PD-1', 'Humanised IgG4 anti-PD-1 antibody with Fc-engineered framework to minimise FcγR binding and ADCP-mediated T-cell depletion', 'Phase III', 'Investigational', FALSE, FALSE, FALSE, FALSE, 'Tevimbra; approved in China for multiple indications; RATIONALE-307 Phase III in NSCLC and RATIONALE-302 in oesophageal squamous cell carcinoma support global development.'),

-- 30. Zanubrutinib (BeiGene)
(13, 'Zanubrutinib', 'BGB-3111', 'Zanubrutinib', 'Small Molecule', 'BTK', 'Next-generation oral irreversible BTK inhibitor with improved selectivity over ibrutinib, reducing off-target kinase adverse effects', 'Approved', 'Approved', FALSE, TRUE, TRUE, TRUE, 'Brukinsa; approved for CLL (ALPINE), mantle cell lymphoma, Waldenström''s macroglobulinemia, and marginal zone lymphoma; superior PFS vs. ibrutinib in CLL.'),

-- 31. Tarlatamab (Amgen)
(14, 'Tarlatamab', 'AMG 757', 'Tarlatamab', 'Bispecific', 'DLL3/CD3', 'DLL3xCD3 BiTE (bispecific T-cell engager) redirecting cytotoxic T cells to DLL3-expressing SCLC and neuroendocrine tumour cells', 'Approved', 'Approved', FALSE, FALSE, TRUE, TRUE, 'Imdelltra; first approved therapy for relapsed/refractory SCLC with DLL3 targeting based on DeLLphi-301 Phase II; DeLLphi-304 Phase III in first-line SCLC ongoing.'),

-- 32. Sotorasib (Amgen)
(14, 'Sotorasib', 'AMG 510', 'Sotorasib', 'Small Molecule', 'KRAS G12C', 'First-in-class covalent KRAS G12C inhibitor binding the switch-II pocket and locking KRAS in inactive GDP-bound state', 'Approved', 'Approved', TRUE, FALSE, TRUE, TRUE, 'Lumakras; first approved KRAS G12C inhibitor for NSCLC (CodeBreaK 200); CodeBreaK 300 evaluating sotorasib + panitumumab in KRAS G12C+ CRC.'),

-- 33. BNT323 (BioNTech)
(15, 'BNT323', 'DB-1303', NULL, 'ADC', 'HER2', 'Anti-HER2 ADC using a novel topoisomerase I inhibitor payload (exatecan derivative) with a proprietary stable linker', 'Phase II', 'Investigational', FALSE, FALSE, TRUE, FALSE, 'HER2-targeting ADC in-licensed from Eisai (DB-1303); Phase I/II demonstrating clinical activity in HER2+ and HER2-low breast cancer and NSCLC HER2-mutated; differentiated by payload and linker chemistry.'),

-- 34. Ivonescimab (Summit Therapeutics)
(16, 'Ivonescimab', 'SMT112 / AK112', NULL, 'Bispecific', 'PD-1/VEGF', 'PD-1xVEGF tetravalent bispecific antibody simultaneously blocking immunosuppressive PD-1 checkpoint and VEGF-mediated angiogenesis', 'Phase III', 'Investigational', FALSE, FALSE, TRUE, TRUE, 'Licensed from Akeso for US/Canada/EU rights; HARMONi-2 Phase III beat pembrolizumab in PD-L1+ NSCLC in China; HARMONi-A Phase III ongoing in Western populations.'),

-- 35. Cadonilimab (Akeso)
(17, 'Cadonilimab', 'AK104', NULL, 'Bispecific', 'PD-1/CTLA-4', 'PD-1xCTLA-4 bispecific antibody providing dual checkpoint blockade with a tumour microenvironment-preferential mechanism reducing systemic toxicity vs. combination monotherapy', 'Phase III', 'Investigational', FALSE, FALSE, FALSE, FALSE, 'Approved in China for PD-L1+ cervical cancer; COMPASSION-02 Phase III in cervical cancer and gastric/GEJ cancer ongoing for global registration.'),

-- 36. Cabozantinib (Exelixis)
(18, 'Cabozantinib', 'XL184', 'Cabozantinib', 'Small Molecule', 'MET/VEGFR2/AXL', 'Oral multi-kinase inhibitor of VEGFR2, MET, AXL, RET, KIT, and FLT3 providing anti-angiogenic and anti-tumour activity', 'Approved', 'Approved', FALSE, TRUE, FALSE, FALSE, 'Cabometyx/Cometriq; approved for RCC (METEOR, CABOSUN), HCC (CELESTIAL), and differentiated thyroid cancer; combination with nivolumab approved in first-line RCC (CheckMate 9ER).'),

-- 37. XL092 (Exelixis)
(18, 'XL092', 'XL092', NULL, 'Small Molecule', 'VEGFR2/MET/AXL', 'Next-generation oral multi-kinase inhibitor designed with improved kinase selectivity profile over cabozantinib', 'Phase III', 'Investigational', FALSE, FALSE, FALSE, FALSE, 'Second-generation cabozantinib successor in Phase III STELLAR-303 for previously treated RCC; evaluated across multiple solid tumour combinations with checkpoint inhibitors.'),

-- 38. Selpercatinib (Eli Lilly)
(19, 'Selpercatinib', 'LOXO-292', 'Selpercatinib', 'Small Molecule', 'RET', 'Highly selective oral RET kinase inhibitor with activity against RET fusions, point mutations (including gatekeeper), and CNS metastases', 'Approved', 'Approved', TRUE, TRUE, TRUE, TRUE, 'Retevmo; first selective RET inhibitor approved for RET fusion-positive NSCLC (LIBRETTO-431 Phase III) and thyroid cancer; developed by Loxo Oncology acquired by Eli Lilly.'),

-- 39. Imlunestrant (Eli Lilly)
(19, 'Imlunestrant', 'LY3484356', 'Imlunestrant', 'Small Molecule', 'ER/ESR1', 'Oral selective oestrogen receptor degrader (SERD) with activity against ESR1 ligand-binding domain mutations driving CDK4/6i resistance in breast cancer', 'Phase III', 'Investigational', FALSE, FALSE, TRUE, FALSE, 'Investigational SERD in Phase III EMBER-3 demonstrating PFS benefit in ESR1-mutated HR+/HER2- breast cancer; EMBER-4 Phase III in combination with abemaciclib for adjuvant setting ongoing.'),

-- 40. Tusamitamab Ravtansine (Sanofi)
(20, 'Tusamitamab Ravtansine', 'SAR408701', NULL, 'ADC', 'CEACAM5', 'Anti-CEACAM5 ADC carrying emtansine (DM4) maytansinoid payload; CEACAM5 overexpressed in NSCLC, CRC, and gastric cancer', 'Phase III', 'Investigational', FALSE, FALSE, TRUE, FALSE, 'CEACAM5-targeting ADC in Phase III CARMEN-LC04 for CEACAM5-high non-squamous NSCLC; differentiated target antigen with high expression in lung adenocarcinoma.');


-- drug_id reference:
--  1=Pembrolizumab, 2=Belzutifan, 3=Olaparib, 4=Osimertinib, 5=Durvalumab
--  6=Rilvegostomig, 7=Volrustomig, 8=Mosunetuzumab, 9=Tiragolumab, 10=Inavolisib
-- 11=Lorlatinib, 12=Elranatamab, 13=Nivolumab, 14=Adagrasib, 15=Amivantamab
-- 16=Lazertinib, 17=Capmatinib, 18=Spartalizumab, 19=Sacituzumab Govitecan, 20=Venetoclax
-- 21=Navitoclax, 22=Trastuzumab Deruxtecan, 23=Datopotamab Deruxtecan, 24=Patritumab Deruxtecan
-- 25=Ifinatamab Deruxtecan, 26=Epcoritamab, 27=Cemiplimab, 28=Zanidatamab, 29=Tislelizumab
-- 30=Zanubrutinib, 31=Tarlatamab, 32=Sotorasib, 33=BNT323, 34=Ivonescimab
-- 35=Cadonilimab, 36=Cabozantinib, 37=XL092, 38=Selpercatinib, 39=Imlunestrant
-- 40=Tusamitamab Ravtansine

INSERT INTO drug_indications (drug_id, therapeutic_area, cancer_type, indication, biomarker, line_of_therapy, development_phase, approval_status, market_priority, is_primary, notes) VALUES

-- PEMBROLIZUMAB (1) ---------------------------------------------------------
(1, 'Oncology', 'Non-Small Cell Lung Cancer', 'Metastatic NSCLC, PD-L1 TPS ≥50%, no EGFR/ALK, first-line monotherapy', 'PD-L1 TPS ≥50%', '1L', 'Approved', 'Approved', 'High', TRUE, 'KEYNOTE-024; first approval for IO monotherapy in NSCLC'),
(1, 'Oncology', 'Non-Small Cell Lung Cancer', 'Metastatic NSCLC, PD-L1 TPS ≥1%, first-line with pemetrexed and platinum', 'PD-L1 TPS ≥1%', '1L', 'Approved', 'Approved', 'High', FALSE, 'KEYNOTE-189'),
(1, 'Oncology', 'Triple Negative Breast Cancer', 'Early high-risk TNBC, neoadjuvant + adjuvant', 'PD-L1 CPS', '1L', 'Approved', 'Approved', 'High', FALSE, 'KEYNOTE-522'),
(1, 'Oncology', 'Melanoma', 'Unresectable or metastatic melanoma, first-line', NULL, '1L', 'Approved', 'Approved', 'High', FALSE, 'KEYNOTE-006'),
(1, 'Oncology', 'Colorectal Cancer', 'MSI-H/dMMR metastatic CRC, first-line', 'MSI-H / dMMR', '1L', 'Approved', 'Approved', 'Medium', FALSE, 'KEYNOTE-177'),
(1, 'Oncology', 'Endometrial Cancer', 'Advanced endometrial carcinoma with mismatch repair deficient, first-line with chemo', 'dMMR', '1L', 'Approved', 'Approved', 'Medium', FALSE, 'KEYNOTE-868'),

-- BELZUTIFAN (2) ------------------------------------------------------------
(2, 'Oncology', 'Renal Cell Carcinoma', 'VHL disease-associated clear cell RCC (non-metastatic)', 'VHL mutation', 'Any', 'Approved', 'Approved', 'High', TRUE, 'Original VHL indication'),
(2, 'Oncology', 'Renal Cell Carcinoma', 'Previously treated advanced clear cell RCC after PD-1/PD-L1 and VEGF therapy', NULL, '2L+', 'Approved', 'Approved', 'High', FALSE, 'LITESPARK-005 Phase III; vs. everolimus'),

-- OLAPARIB (3) --------------------------------------------------------------
(3, 'Oncology', 'Ovarian Cancer', 'Maintenance therapy for BRCA-mutated advanced ovarian cancer after platinum response', 'BRCA1/2 mutation', 'Maintenance', 'Approved', 'Approved', 'High', TRUE, 'SOLO-1 (1L) and SOLO-2 (2L+)'),
(3, 'Oncology', 'Breast Cancer', 'Germline BRCA-mutated HER2-negative metastatic breast cancer', 'gBRCA1/2 mutation', '1L-2L', 'Approved', 'Approved', 'High', FALSE, 'OlympiAD and OLYMPIA adjuvant'),
(3, 'Oncology', 'Pancreatic Cancer', 'Germline BRCA1/2-mutated metastatic pancreatic cancer, maintenance after platinum', 'gBRCA1/2 mutation', 'Maintenance', 'Approved', 'Approved', 'Medium', FALSE, 'POLO trial'),

-- OSIMERTINIB (4) -----------------------------------------------------------
(4, 'Oncology', 'Non-Small Cell Lung Cancer', 'First-line metastatic EGFR-mutated (ex19del or L858R) NSCLC', 'EGFR ex19del / L858R', '1L', 'Approved', 'Approved', 'High', TRUE, 'FLAURA Phase III; FLAURA2 with chemotherapy combination'),
(4, 'Oncology', 'Non-Small Cell Lung Cancer', 'Adjuvant therapy after resection, EGFR ex19del or L858R, Stage IB-IIIA', 'EGFR ex19del / L858R', 'Adjuvant', 'Approved', 'Approved', 'High', FALSE, 'ADAURA Phase III'),
(4, 'Oncology', 'Non-Small Cell Lung Cancer', 'Unresectable Stage III NSCLC, EGFR-mutated, after chemoradiation', 'EGFR ex19del / L858R', 'Consolidation', 'Approved', 'Approved', 'High', FALSE, 'LAURA Phase III; positive OS data 2024'),

-- DURVALUMAB (5) ------------------------------------------------------------
(5, 'Oncology', 'Non-Small Cell Lung Cancer', 'Unresectable Stage III NSCLC, no progression after chemoradiation, consolidation', NULL, 'Consolidation', 'Approved', 'Approved', 'High', TRUE, 'PACIFIC Phase III; extended OS benefit maintained at 5 years'),
(5, 'Oncology', 'Small Cell Lung Cancer', 'Extensive-stage SCLC, first-line with etoposide/carboplatin or cisplatin', NULL, '1L', 'Approved', 'Approved', 'High', FALSE, 'CASPIAN Phase III'),

-- RILVEGOSTOMIG (6) ---------------------------------------------------------
(6, 'Oncology', 'Non-Small Cell Lung Cancer', 'First-line metastatic NSCLC, PD-L1 ≥50%, no EGFR/ALK alterations', 'PD-L1 TPS ≥50%', '1L', 'Phase III', 'Investigational', 'High', TRUE, 'ARTEMIDE-Lung02 Phase III; designed to outperform pembrolizumab monotherapy'),
(6, 'Oncology', 'Gastric Cancer', 'Advanced gastric/GEJ adenocarcinoma, first-line combination', NULL, '1L', 'Phase III', 'Investigational', 'Medium', FALSE, 'Part of AZD7789 expanded solid tumour programme'),

-- VOLRUSTOMIG (7) -----------------------------------------------------------
(7, 'Oncology', 'Non-Small Cell Lung Cancer', 'Metastatic NSCLC, unselected, first-line combination', NULL, '1L', 'Phase III', 'Investigational', 'Medium', TRUE, 'SAVANNA Phase III evaluating volrustomig + durvalumab ± chemotherapy'),
(7, 'Oncology', 'Non-Small Cell Lung Cancer', 'Previously treated NSCLC, post-osimertinib resistance', NULL, '2L+', 'Phase II', 'Investigational', 'Medium', FALSE, 'Exploratory cohorts in osimertinib-resistant NSCLC'),

-- MOSUNETUZUMAB (8) ---------------------------------------------------------
(8, 'Oncology', 'Follicular Lymphoma', 'Relapsed/refractory follicular lymphoma, ≥2 prior therapies', NULL, '3L+', 'Approved', 'Approved', 'High', TRUE, 'GO29781/CELESTIMO; approved EU and US for FL'),
(8, 'Oncology', 'Diffuse Large B-Cell Lymphoma', 'Relapsed/refractory DLBCL, combination with polatuzumab vedotin', NULL, '2L+', 'Phase II', 'Investigational', 'Medium', FALSE, 'MORPHEUS-FL platform trial'),

-- TIRAGOLUMAB (9) -----------------------------------------------------------
(9, 'Oncology', 'Non-Small Cell Lung Cancer', 'Metastatic NSCLC, PD-L1 ≥50%, first-line with atezolizumab', 'PD-L1 TPS ≥50%', '1L', 'Phase III', 'Investigational', 'Low', TRUE, 'SKYSCRAPER-01; did not meet co-primary PFS endpoint; OS analysis ongoing'),
(9, 'Oncology', 'Small Cell Lung Cancer', 'Extensive-stage SCLC, first-line with atezolizumab + carboplatin + etoposide', NULL, '1L', 'Phase III', 'Investigational', 'Low', FALSE, 'SKYSCRAPER-02; Phase III did not meet primary PFS endpoint'),

-- INAVOLISIB (10) -----------------------------------------------------------
(10, 'Oncology', 'Breast Cancer', 'PIK3CA-mutated HR+/HER2- advanced breast cancer, first-line with palbociclib + fulvestrant', 'PIK3CA mutation', '1L', 'Approved', 'Approved', 'High', TRUE, 'INAVO120 Phase III; OS benefit demonstrated 2024'),

-- LORLATINIB (11) -----------------------------------------------------------
(11, 'Oncology', 'Non-Small Cell Lung Cancer', 'ALK-positive metastatic NSCLC, first-line', 'ALK rearrangement', '1L', 'Approved', 'Approved', 'High', TRUE, 'CROWN Phase III vs. crizotinib; superior intracranial control'),
(11, 'Oncology', 'Non-Small Cell Lung Cancer', 'ALK-positive NSCLC, after crizotinib and one prior ALK inhibitor', 'ALK rearrangement', '2L+', 'Approved', 'Approved', 'Medium', FALSE, 'Approved based on B7461001 study'),

-- ELRANATAMAB (12) ----------------------------------------------------------
(12, 'Oncology', 'Multiple Myeloma', 'Triple-class exposed relapsed/refractory multiple myeloma', NULL, '4L+', 'Approved', 'Approved', 'High', TRUE, 'MagnetisMM-3 Phase II; accelerated approval May 2023'),

-- NIVOLUMAB (13) ------------------------------------------------------------
(13, 'Oncology', 'Melanoma', 'Unresectable or metastatic melanoma, first-line', NULL, '1L', 'Approved', 'Approved', 'High', TRUE, 'CheckMate-066 and CheckMate-067 (with ipilimumab)'),
(13, 'Oncology', 'Non-Small Cell Lung Cancer', 'Metastatic squamous and non-squamous NSCLC, second-line', NULL, '2L', 'Approved', 'Approved', 'High', FALSE, 'CheckMate-017 (sq) and CheckMate-057 (non-sq)'),
(13, 'Oncology', 'Renal Cell Carcinoma', 'Advanced clear-cell RCC, first-line with ipilimumab (intermediate/poor risk)', NULL, '1L', 'Approved', 'Approved', 'High', FALSE, 'CheckMate-214'),
(13, 'Oncology', 'Small Cell Lung Cancer', 'Metastatic SCLC, ≥3 prior lines', NULL, '3L+', 'Approved', 'Approved', 'Low', FALSE, 'CheckMate-032'),
(13, 'Oncology', 'Hepatocellular Carcinoma', 'Previously treated advanced HCC, with ipilimumab', NULL, '2L', 'Approved', 'Approved', 'Medium', FALSE, 'CheckMate-040'),

-- ADAGRASIB (14) ------------------------------------------------------------
(14, 'Oncology', 'Non-Small Cell Lung Cancer', 'KRAS G12C-mutated metastatic NSCLC, after platinum and PD-1/L1 therapy', 'KRAS G12C', '2L+', 'Approved', 'Approved', 'High', TRUE, 'KRYSTAL-1 Phase I/II; ORR ~43%'),
(14, 'Oncology', 'Colorectal Cancer', 'KRAS G12C-mutated advanced CRC, with cetuximab, after prior therapy', 'KRAS G12C', '2L+', 'Approved', 'Approved', 'High', FALSE, 'KRYSTAL-10 Phase III; first KRAS-targeted approval in CRC (combination)'),

-- AMIVANTAMAB (15) ----------------------------------------------------------
(15, 'Oncology', 'Non-Small Cell Lung Cancer', 'EGFR exon 20 insertion-mutated metastatic NSCLC, after platinum-based chemo', 'EGFR exon 20 insertion', '2L+', 'Approved', 'Approved', 'High', TRUE, 'PAPILLON Phase III; first approved therapy for this insertion population'),
(15, 'Oncology', 'Non-Small Cell Lung Cancer', 'EGFR-mutated metastatic NSCLC, first-line with lazertinib', 'EGFR ex19del / L858R', '1L', 'Approved', 'Approved', 'High', FALSE, 'MARIPOSA Phase III vs. osimertinib; approved combination 2024'),
(15, 'Oncology', 'Non-Small Cell Lung Cancer', 'EGFR-mutated NSCLC, post-osimertinib progression, with lazertinib + carboplatin/pemetrexed', 'EGFR ex19del / L858R', '2L', 'Approved', 'Approved', 'High', FALSE, 'MARIPOSA-2 Phase III'),

-- LAZERTINIB (16) -----------------------------------------------------------
(16, 'Oncology', 'Non-Small Cell Lung Cancer', 'EGFR-mutated metastatic NSCLC, first-line with amivantamab', 'EGFR ex19del / L858R', '1L', 'Approved', 'Approved', 'High', TRUE, 'MARIPOSA; companion approval with amivantamab'),

-- CAPMATINIB (17) -----------------------------------------------------------
(17, 'Oncology', 'Non-Small Cell Lung Cancer', 'METex14-skipping mutated metastatic NSCLC, first-line and beyond', 'METex14 skipping', '1L+', 'Approved', 'Approved', 'High', TRUE, 'GEOMETRY mono-1 Phase II; full approval 2022'),

-- SACITUZUMAB GOVITECAN (19) ------------------------------------------------
(19, 'Oncology', 'Triple Negative Breast Cancer', 'Unresectable locally advanced or metastatic TNBC, ≥2 prior therapies', NULL, '3L+', 'Approved', 'Approved', 'High', TRUE, 'ASCENT Phase III; superior OS and PFS vs. chemotherapy'),
(19, 'Oncology', 'Breast Cancer', 'HR+/HER2-negative (HER2-0 or low) metastatic breast cancer, ≥2 prior endocrine and CDK4/6i', NULL, '3L+', 'Approved', 'Approved', 'High', FALSE, 'TROPiCS-02 Phase III'),
(19, 'Oncology', 'Non-Small Cell Lung Cancer', 'Metastatic non-squamous NSCLC without driver alterations, after platinum and PD-1/L1 therapy', NULL, '2L+', 'Phase III', 'Investigational', 'High', FALSE, 'EVOKE-01 Phase III vs. docetaxel'),
(19, 'Oncology', 'Urothelial Cancer', 'Locally advanced or metastatic urothelial carcinoma, after platinum and PD-1/L1 therapy', NULL, '3L+', 'Approved', 'Approved', 'Medium', FALSE, 'Accelerated approval; TROPHY-U-01'),

-- VENETOCLAX (20) -----------------------------------------------------------
(20, 'Oncology', 'Chronic Lymphocytic Leukaemia', 'Previously untreated CLL with obinutuzumab, 12-cycle fixed duration', NULL, '1L', 'Approved', 'Approved', 'High', TRUE, 'CLL14 Phase III; superior PFS and MRD negativity'),
(20, 'Oncology', 'Acute Myeloid Leukaemia', 'Newly diagnosed AML unfit for intensive chemotherapy, with azacitidine', NULL, '1L', 'Approved', 'Approved', 'High', FALSE, 'VIALE-A Phase III; superior CR rate and OS'),
(20, 'Oncology', 'Chronic Lymphocytic Leukaemia', 'Relapsed/refractory CLL with rituximab, 24-month fixed duration', NULL, '2L+', 'Approved', 'Approved', 'Medium', FALSE, 'MURANO Phase III'),

-- NAVITOCLAX (21) -----------------------------------------------------------
(21, 'Oncology', 'Myelofibrosis', 'Ruxolitinib-naive myelofibrosis, combination with ruxolitinib, first-line', NULL, '1L', 'Phase III', 'Investigational', 'High', TRUE, 'TRANSFORM-1 Phase III; superior SVR at week 24 vs. ruxolitinib alone'),
(21, 'Oncology', 'Acute Myeloid Leukaemia', 'R/R AML, combination with venetoclax + azacitidine, phase II basket', NULL, '2L+', 'Phase II', 'Investigational', 'Medium', FALSE, 'Exploratory; limited by thrombocytopaenia'),

-- TRASTUZUMAB DERUXTECAN (22) -----------------------------------------------
(22, 'Oncology', 'Breast Cancer', 'HER2-positive unresectable or metastatic breast cancer, after trastuzumab + taxane', 'HER2+ (IHC3+ or ISH+)', '2L+', 'Approved', 'Approved', 'High', TRUE, 'DESTINY-Breast03; superior PFS and OS vs. T-DM1'),
(22, 'Oncology', 'Breast Cancer', 'HER2-low (IHC1+, IHC2+/ISH-) unresectable or metastatic breast cancer, after chemo', 'HER2-low', '2L+', 'Approved', 'Approved', 'High', FALSE, 'DESTINY-Breast04; practice-changing OS benefit'),
(22, 'Oncology', 'Non-Small Cell Lung Cancer', 'HER2-mutated (activating) unresectable or metastatic NSCLC, after platinum', 'HER2 mutation', '2L+', 'Approved', 'Approved', 'High', FALSE, 'DESTINY-Lung02; ORR ~51%'),
(22, 'Oncology', 'Gastric Cancer', 'HER2-positive advanced gastric or GEJ adenocarcinoma, after trastuzumab', 'HER2+ (IHC3+ or ISH+)', '2L+', 'Approved', 'Approved', 'Medium', FALSE, 'DESTINY-Gastric01 and DESTINY-Gastric02'),

-- DATOPOTAMAB DERUXTECAN (23) -----------------------------------------------
(23, 'Oncology', 'Breast Cancer', 'HR+/HER2-negative (TROP2+) locally advanced or metastatic breast cancer, after endocrine and CDK4/6i', 'TROP2 expression', '3L+', 'Phase III', 'Investigational', 'High', TRUE, 'TROPION-Breast01 Phase III vs. chemotherapy'),
(23, 'Oncology', 'Non-Small Cell Lung Cancer', 'Metastatic non-squamous NSCLC without actionable driver, after platinum and IO', NULL, '2L+', 'Phase III', 'Investigational', 'High', FALSE, 'TROPION-Lung01 Phase III vs. docetaxel; OS benefit'),
(23, 'Oncology', 'Triple Negative Breast Cancer', 'Metastatic TNBC (TROP2-high), after 1-2 prior lines', 'TROP2 expression', '2L', 'Phase III', 'Investigational', 'High', FALSE, 'TROPION-Breast02 Phase III vs. SG'),

-- PATRITUMAB DERUXTECAN (24) ------------------------------------------------
(24, 'Oncology', 'Non-Small Cell Lung Cancer', 'EGFR-mutated metastatic NSCLC, after osimertinib and platinum chemotherapy', 'HER3 expression / EGFR mutation', '3L+', 'Phase III', 'Investigational', 'High', TRUE, 'HERTHENA-Lung02 Phase III; 5.5-month PFS in Phase II HERTHENA-Lung01'),
(24, 'Oncology', 'Non-Small Cell Lung Cancer', 'Metastatic NSCLC with HER3 overexpression, unselected by EGFR status', 'HER3 expression', '2L+', 'Phase II', 'Investigational', 'Medium', FALSE, 'HERTHENA-Lung01 Phase II basket'),

-- IFINATAMAB DERUXTECAN (25) ------------------------------------------------
(25, 'Oncology', 'Small Cell Lung Cancer', 'Relapsed/refractory extensive-stage SCLC, ≥2 prior therapies', 'B7-H3 expression', '3L+', 'Phase II', 'Investigational', 'High', TRUE, 'IDeate-Lung01 Phase II; ORR ~52% in B7-H3-high'),
(25, 'Oncology', 'Non-Small Cell Lung Cancer', 'Metastatic NSCLC, B7-H3-expressing, after prior systemic therapy', 'B7-H3 expression', '2L+', 'Phase I', 'Investigational', 'Medium', FALSE, 'DS-7300a-1001 Phase I dose expansion'),

-- EPCORITAMAB (26) ----------------------------------------------------------
(26, 'Oncology', 'Diffuse Large B-Cell Lymphoma', 'Relapsed/refractory large B-cell lymphoma, ≥2 prior lines including anti-CD20', NULL, '3L+', 'Approved', 'Approved', 'High', TRUE, 'EPCORE NHL-1 Phase I/II; ORR ~63%, CRR ~39%'),
(26, 'Oncology', 'Follicular Lymphoma', 'Relapsed/refractory follicular lymphoma Grade 1-3a, ≥2 prior therapies', NULL, '3L+', 'Approved', 'Approved', 'High', FALSE, 'EPCORE FL-1; FDA approved 2024'),

-- CEMIPLIMAB (27) -----------------------------------------------------------
(27, 'Oncology', 'Non-Small Cell Lung Cancer', 'Metastatic NSCLC, PD-L1 ≥50%, no EGFR/ALK, first-line monotherapy', 'PD-L1 TPS ≥50%', '1L', 'Approved', 'Approved', 'High', TRUE, 'EMPOWER-Lung-1 Phase III; superior OS vs. chemotherapy'),
(27, 'Oncology', 'Cervical Cancer', 'Recurrent or metastatic cervical cancer, after platinum-based chemo', NULL, '2L', 'Approved', 'Approved', 'High', FALSE, 'EMPOWER-Cervical-1 Phase III; superior OS'),
(27, 'Oncology', 'Non-Small Cell Lung Cancer', 'Resectable NSCLC, neoadjuvant with chemotherapy, Stage II-IIIA', NULL, 'Neoadjuvant', 'Phase III', 'Investigational', 'Medium', FALSE, 'NEOCOAST Phase II; KEYNOTE-671 competitor'),

-- ZANIDATAMAB (28) ----------------------------------------------------------
(28, 'Oncology', 'Biliary Tract Cancer', 'HER2-amplified unresectable or metastatic biliary tract cancer, after gemcitabine-based chemo', 'HER2 amplification/overexpression', '2L+', 'Filed', 'Investigational', 'High', TRUE, 'HERIZON-BTC-01; BLA filed with FDA 2024'),
(28, 'Oncology', 'Gastric Cancer', 'HER2-positive advanced gastric or GEJ adenocarcinoma, first-line with chemo', 'HER2+ (IHC3+ or ISH+)', '1L', 'Phase III', 'Investigational', 'High', FALSE, 'HERIZON-GEA-01 Phase III; vs. trastuzumab + chemo'),

-- TISLELIZUMAB (29) ---------------------------------------------------------
(29, 'Oncology', 'Non-Small Cell Lung Cancer', 'Metastatic non-squamous NSCLC, first-line with platinum-based chemo', NULL, '1L', 'Phase III', 'Investigational', 'Medium', TRUE, 'RATIONALE-307 Phase III in squamous NSCLC; RATIONALE-304 in non-squamous'),
(29, 'Oncology', 'Esophageal Cancer', 'Unresectable/metastatic oesophageal squamous cell carcinoma, second-line', NULL, '2L', 'Phase III', 'Investigational', 'Medium', FALSE, 'RATIONALE-302 Phase III vs. chemotherapy'),

-- ZANUBRUTINIB (30) ---------------------------------------------------------
(30, 'Oncology', 'Chronic Lymphocytic Leukaemia', 'Treatment-naive and relapsed/refractory CLL/SLL', NULL, '1L+', 'Approved', 'Approved', 'High', TRUE, 'ALPINE Phase III vs. ibrutinib; superior PFS and cardiac safety'),
(30, 'Oncology', 'Mantle Cell Lymphoma', 'Relapsed/refractory mantle cell lymphoma, after prior therapy', NULL, '2L+', 'Approved', 'Approved', 'High', FALSE, 'BGB-3111-206 Phase II'),
(30, 'Oncology', 'Waldenström Macroglobulinemia', 'Waldenström macroglobulinaemia, treatment-naive and relapsed/refractory', NULL, '1L+', 'Approved', 'Approved', 'Medium', FALSE, 'ASPEN Phase III vs. ibrutinib'),

-- TARLATAMAB (31) -----------------------------------------------------------
(31, 'Oncology', 'Small Cell Lung Cancer', 'Previously treated extensive-stage SCLC, ≥2 prior therapies', 'DLL3 expression', '3L+', 'Approved', 'Approved', 'High', TRUE, 'DeLLphi-301 Phase II; ORR ~40%, mDOR ~9.9 months; approved May 2024'),
(31, 'Oncology', 'Small Cell Lung Cancer', 'First-line extensive-stage SCLC, with etoposide/platinum ± atezolizumab', 'DLL3 expression', '1L', 'Phase III', 'Investigational', 'High', FALSE, 'DeLLphi-304 Phase III; co-primary PFS and OS'),

-- SOTORASIB (32) ------------------------------------------------------------
(32, 'Oncology', 'Non-Small Cell Lung Cancer', 'KRAS G12C-mutated metastatic NSCLC, after platinum-based chemo and IO', 'KRAS G12C', '2L', 'Approved', 'Approved', 'High', TRUE, 'CodeBreaK 200 Phase III vs. docetaxel; superior PFS'),
(32, 'Oncology', 'Colorectal Cancer', 'KRAS G12C-mutated advanced CRC, with panitumumab, after prior therapy', 'KRAS G12C', '2L+', 'Phase III', 'Investigational', 'High', FALSE, 'CodeBreaK 300 Phase III vs. standard of care; ORR superiority'),

-- BNT323 (33) ---------------------------------------------------------------
(33, 'Oncology', 'Breast Cancer', 'HER2-positive or HER2-low (IHC1+/2+) advanced breast cancer, after HER2-directed therapy', 'HER2+ / HER2-low', '2L+', 'Phase II', 'Investigational', 'Medium', TRUE, 'DB-1303-001 Phase I/II dose expansion; clinical activity in HER2-treated patients'),
(33, 'Oncology', 'Non-Small Cell Lung Cancer', 'HER2-mutated metastatic NSCLC, after prior platinum-based therapy', 'HER2 mutation', '2L+', 'Phase I', 'Investigational', 'Medium', FALSE, 'DB-1303-001 Phase I/II NSCLC cohort'),

-- IVONESCIMAB (34) ----------------------------------------------------------
(34, 'Oncology', 'Non-Small Cell Lung Cancer', 'Metastatic NSCLC, PD-L1 positive (TPS ≥1%), no EGFR/ALK, first-line', 'PD-L1 TPS ≥1%', '1L', 'Phase III', 'Investigational', 'High', TRUE, 'HARMONi-2 Phase III in China; superior PFS vs. pembrolizumab (12.9 vs. 4.4m); US HARMONi-A Phase III enrolling'),
(34, 'Oncology', 'Non-Small Cell Lung Cancer', 'Metastatic NSCLC, all-comers (PD-L1 unselected), first-line with chemotherapy', NULL, '1L', 'Phase III', 'Investigational', 'High', FALSE, 'HARMONi Phase III with carboplatin/paclitaxel'),

-- CADONILIMAB (35) ----------------------------------------------------------
(35, 'Oncology', 'Cervical Cancer', 'Persistent, recurrent, or metastatic cervical cancer, PD-L1+, first-line with chemo', 'PD-L1 CPS ≥1', '1L', 'Phase III', 'Investigational', 'High', TRUE, 'COMPASSION-02 Phase III; approved in China for PD-L1+ cervical cancer'),
(35, 'Oncology', 'Gastric Cancer', 'HER2-negative advanced gastric/GEJ adenocarcinoma, first-line with chemotherapy', NULL, '1L', 'Phase III', 'Investigational', 'Medium', FALSE, 'AK104-303 Phase III in gastric cancer'),

-- CABOZANTINIB (36) ---------------------------------------------------------
(36, 'Oncology', 'Renal Cell Carcinoma', 'Advanced RCC, after prior antiangiogenic therapy', NULL, '2L', 'Approved', 'Approved', 'High', TRUE, 'METEOR Phase III vs. everolimus; first approved indication'),
(36, 'Oncology', 'Hepatocellular Carcinoma', 'Advanced HCC, previously treated with sorafenib', NULL, '2L', 'Approved', 'Approved', 'High', FALSE, 'CELESTIAL Phase III vs. placebo'),
(36, 'Oncology', 'Renal Cell Carcinoma', 'Advanced RCC, first-line with nivolumab (all risk groups)', NULL, '1L', 'Approved', 'Approved', 'High', FALSE, 'CheckMate 9ER Phase III; superior OS and PFS'),

-- XL092 (37) ----------------------------------------------------------------
(37, 'Oncology', 'Renal Cell Carcinoma', 'Advanced clear-cell RCC, previously treated, second-line with atezolizumab', NULL, '2L', 'Phase III', 'Investigational', 'High', TRUE, 'STELLAR-303 Phase III vs. cabozantinib; enrolment ongoing'),
(37, 'Oncology', 'Breast Cancer', 'HR+/HER2- metastatic breast cancer, combination with checkpoint inhibitor', NULL, '2L+', 'Phase II', 'Investigational', 'Low', FALSE, 'Exploratory combination study'),

-- SELPERCATINIB (38) --------------------------------------------------------
(38, 'Oncology', 'Non-Small Cell Lung Cancer', 'RET fusion-positive metastatic NSCLC, first-line and previously treated', 'RET fusion', '1L+', 'Approved', 'Approved', 'High', TRUE, 'LIBRETTO-431 Phase III vs. SOC chemo±IO; superior PFS in treatment-naive'),
(38, 'Oncology', 'Thyroid Cancer', 'RET mutation-positive medullary thyroid cancer and RET fusion-positive thyroid cancer', 'RET mutation/fusion', '2L+', 'Approved', 'Approved', 'High', FALSE, 'LIBRETTO-001 Phase I/II; durable responses in RET-altered thyroid cancer'),

-- IMLUNESTRANT (39) ---------------------------------------------------------
(39, 'Oncology', 'Breast Cancer', 'HR+/HER2-negative advanced breast cancer with ESR1 mutation, after 1-2 prior endocrine therapies', 'ESR1 mutation', '2L+', 'Phase III', 'Investigational', 'High', TRUE, 'EMBER-3 Phase III; improved PFS in ESR1-mutated population vs. fulvestrant'),
(39, 'Oncology', 'Breast Cancer', 'HR+/HER2-negative early breast cancer, adjuvant with abemaciclib', NULL, 'Adjuvant', 'Phase III', 'Investigational', 'High', FALSE, 'EMBER-4 Phase III; imlunestrant vs. aromatase inhibitor + abemaciclib'),

-- TUSAMITAMAB RAVTANSINE (40) -----------------------------------------------
(40, 'Oncology', 'Non-Small Cell Lung Cancer', 'CEACAM5-high non-squamous NSCLC, after platinum-based chemo and anti-PD-1/L1', 'CEACAM5 H-score ≥150', '2L+', 'Phase III', 'Investigational', 'High', TRUE, 'CARMEN-LC04 Phase III vs. docetaxel; CEACAM5-selected population'),
(40, 'Oncology', 'Colorectal Cancer', 'CEACAM5-positive advanced CRC, after standard therapies', 'CEACAM5 expression', '3L+', 'Phase II', 'Investigational', 'Medium', FALSE, 'CARMEN-CRC01 Phase II basket study');