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




-- ============================================================
-- 08_patch_2025_2026_approvals.sql
-- KMK Pipeline Intelligence Platform — Data Patch
-- Source: FDA Oncology Approvals, retrieved live July 15, 2026
-- URL: https://www.fda.gov/drugs/resources-information-approved-drugs/oncology-cancerhematologic-malignancies-approval-notifications
--
-- NO hardcoded IDs — all foreign keys resolved by name lookup.
-- Safe to run on any Supabase instance regardless of sequence state.
-- Run AFTER the original 6 seed files (02 through 07).
-- ============================================================


-- ============================================================
-- SECTION 1: UPDATE existing drugs whose status changed
-- ============================================================

UPDATE drugs
SET development_phase = 'Approved',
    approval_status   = 'Approved',
    description       = 'Datroway (co-developed/commercialised with AstraZeneca); FDA approved January 17 2025 for HR+/HER2- metastatic breast cancer (TROPION-Breast01) and June 23 2025 for EGFR-mutated NSCLC post-EGFR TKI + platinum (accelerated; TROPION-Lung08 combination data).',
    updated_at        = NOW()
WHERE drug_name = 'Datopotamab Deruxtecan';

UPDATE drugs
SET development_phase = 'Approved',
    approval_status   = 'Approved',
    description       = 'Inluriyo; FDA approved September 25 2025 for ER+/HER2-negative, ESR1-mutated locally advanced or metastatic breast cancer after endocrine therapy and CDK4/6 inhibitor. Based on EMBER-3 Phase III. First oral SERD with traditional FDA approval.',
    updated_at        = NOW()
WHERE drug_name = 'Imlunestrant';

UPDATE drugs
SET description  = 'Imdelltra; converted from accelerated (May 2024) to traditional FDA approval November 19 2025 for relapsed/refractory ES-SCLC after platinum-based chemotherapy, based on confirmatory OS data from DeLLphi-301. DeLLphi-304 Phase III in 1L SCLC ongoing.',
    updated_at   = NOW()
WHERE drug_name = 'Tarlatamab';

UPDATE drugs
SET description  = 'Enhertu (co-developed/commercialised with AstraZeneca); approved in HER2+ BC (DESTINY-Breast03), HER2-low BC (DESTINY-Breast04), HER2-ultralow BC (DESTINY-Breast06, Jan 27 2025), HER2-mutated NSCLC (DESTINY-Lung02), and HER2+ gastric cancer (DESTINY-Gastric01). Broadest HER2-targeting ADC approval landscape.',
    updated_at   = NOW()
WHERE drug_name = 'Trastuzumab Deruxtecan';

UPDATE drugs
SET description  = 'Lumakras; first approved KRAS G12C inhibitor. Full approvals: NSCLC 2L (CodeBreaK 200) and KRAS G12C CRC with panitumumab (CodeBreaK 300, full approval Jan 16 2025, converting Jan 2024 accelerated approval).',
    updated_at   = NOW()
WHERE drug_name = 'Sotorasib';


-- ============================================================
-- SECTION 2: UPDATE drug_indications for existing drugs
-- ============================================================

UPDATE drug_indications
SET development_phase = 'Approved',
    approval_status   = 'Approved',
    notes             = 'TROPION-Breast01 Phase III; FDA approved January 17 2025 — first global Dato-DXd approval',
    updated_at        = NOW()
WHERE drug_id = (SELECT id FROM drugs WHERE drug_name = 'Datopotamab Deruxtecan')
  AND cancer_type = 'Breast Cancer';

UPDATE drug_indications
SET indication        = 'EGFR-mutated metastatic non-squamous NSCLC, after prior EGFR-directed therapy and platinum-based chemotherapy',
    biomarker         = 'EGFR mutation',
    line_of_therapy   = '3L+',
    development_phase = 'Approved',
    approval_status   = 'Approved',
    notes             = 'FDA accelerated approval June 23 2025 for EGFR-mutated NSCLC; TROPION-Lung08 (with pembrolizumab) supporting data',
    updated_at        = NOW()
WHERE drug_id = (SELECT id FROM drugs WHERE drug_name = 'Datopotamab Deruxtecan')
  AND cancer_type = 'Non-Small Cell Lung Cancer';

UPDATE drug_indications
SET development_phase = 'Approved',
    approval_status   = 'Approved',
    notes             = 'EMBER-3 Phase III; FDA approved September 25 2025; brand name Inluriyo',
    updated_at        = NOW()
WHERE drug_id = (SELECT id FROM drugs WHERE drug_name = 'Imlunestrant')
  AND biomarker = 'ESR1 mutation';

UPDATE drug_indications
SET indication  = 'HER2-low (IHC1+ or IHC2+/ISH-) and HER2-ultralow (IHC0 with incomplete membrane staining) unresectable or metastatic breast cancer, after prior chemotherapy',
    biomarker   = 'HER2-low / HER2-ultralow',
    notes       = 'DESTINY-Breast04 (HER2-low, Aug 2022) + DESTINY-Breast06 (HER2-ultralow, Jan 27 2025); expands actionable HER2 to broadest ever population',
    updated_at  = NOW()
WHERE drug_id = (SELECT id FROM drugs WHERE drug_name = 'Trastuzumab Deruxtecan')
  AND biomarker = 'HER2-low';

UPDATE drug_indications
SET development_phase = 'Approved',
    approval_status   = 'Approved',
    notes             = 'CodeBreaK 300 Phase III; accelerated approval Jan 2024; full approval Jan 16 2025',
    updated_at        = NOW()
WHERE drug_id = (SELECT id FROM drugs WHERE drug_name = 'Sotorasib')
  AND cancer_type = 'Colorectal Cancer';

UPDATE drug_indications
SET line_of_therapy   = '1L',
    development_phase = 'Approved',
    approval_status   = 'Approved',
    indication        = 'Unresectable or metastatic MSI-H/dMMR colorectal cancer, first-line, with ipilimumab',
    notes             = 'CheckMate 8HW Phase III April 8 2025 FDA approval; superior PFS vs. chemotherapy',
    updated_at        = NOW()
WHERE drug_id = (SELECT id FROM drugs WHERE drug_name = 'Nivolumab')
  AND cancer_type = 'Colorectal Cancer';


-- ============================================================
-- SECTION 3: UPDATE upcoming_events — mark completed ones
-- ============================================================

UPDATE upcoming_events
SET status      = 'Completed',
    actual_date = '2025-01-17',
    updated_at  = NOW()
WHERE drug_id = (SELECT id FROM drugs WHERE drug_name = 'Datopotamab Deruxtecan')
  AND event_type = 'FDA Submission';

UPDATE upcoming_events
SET status      = 'Completed',
    actual_date = '2025-09-25',
    updated_at  = NOW()
WHERE drug_id = (SELECT id FROM drugs WHERE drug_name = 'Imlunestrant')
  AND event_type = 'FDA Submission';

UPDATE upcoming_events
SET status      = 'Completed',
    actual_date = '2025-01-27',
    updated_at  = NOW()
WHERE drug_id = (SELECT id FROM drugs WHERE drug_name = 'Trastuzumab Deruxtecan')
  AND event_name LIKE '%Breast06%';


-- ============================================================
-- SECTION 4: NEW COMPANIES
-- Uses ON CONFLICT DO NOTHING — safe to re-run
-- ============================================================

INSERT INTO companies (company_name, company_type, headquarters, website, description)
VALUES
('Boehringer Ingelheim', 'Large Pharma', 'Ingelheim am Rhein, Germany', 'https://www.boehringer-ingelheim.com',
 'Family-owned global pharmaceutical company; zongertinib (Hernexeos) is the first HER2-selective (EGFR-sparing) TKI approved for HER2 TKD-mutated non-squamous NSCLC (August 2025).'),
('Arvinas', 'Biotech', 'New Haven, CT, USA', 'https://www.arvinas.com',
 'Pioneer in PROTAC targeted protein degradation technology; vepdegestrant (Veppanu) became the first FDA-approved PROTAC drug for any oncology indication (May 2026), targeting ESR1-mutated HR+ breast cancer.'),
('Celcuity', 'Biotech', 'Minneapolis, MN, USA', 'https://www.celcuity.com',
 'Oncology biotech developing gedatolisib (Revtorpyk), a pan-PI3K/mTOR inhibitor approved July 14 2026 with fulvestrant +/- palbociclib for HR+/HER2- breast cancer without PIK3CA mutation.'),
('Jazz Pharmaceuticals', 'Large Pharma', 'Dublin, Ireland', 'https://www.jazzpharma.com',
 'Specialty pharmaceutical with oncology assets including lurbinectedin (Zepzelca) now approved in combination with atezolizumab for extensive-stage SCLC (October 2025) and dordaviprone (Modeyso) for diffuse midline glioma (August 2025).'),
('Syndax Pharmaceuticals', 'Biotech', 'Waltham, MA, USA', 'https://www.syndax.com',
 'Clinical-stage haematology-focused biopharmaceutical; revumenib (Revuforj) approved October 24 2025 for relapsed/refractory AML with NPM1 mutations; menin inhibitor class pioneer.'),
('Kura Oncology', 'Biotech', 'San Diego, CA, USA', 'https://www.kuraoncology.com',
 'Oncology biotech with ziftomenib (Komzifti) approved November 13 2025 for relapsed/refractory AML with NPM1 mutations; farnesyl transferase inhibitor programme in haematologic malignancies.'),
('Bayer', 'Large Pharma', 'Leverkusen, Germany', 'https://www.bayer.com',
 'Global life sciences company with oncology assets including darolutamide (Nubeqa) approved for mCSPC (June 2025) and sevabertinib (Hyrnuo) approved for HER2 TKD-mutated NSCLC (November 2025).')
ON CONFLICT (company_name) DO NOTHING;


-- ============================================================
-- SECTION 5: NEW DRUGS
-- company_id resolved by name — no hardcoded IDs
-- ============================================================

INSERT INTO drugs (company_id, drug_name, internal_code, generic_name, molecule_type, target, mechanism_of_action, development_phase, approval_status, first_in_class, orphan_designation, fast_track, breakthrough_designation, description)
VALUES

((SELECT id FROM companies WHERE company_name = 'Boehringer Ingelheim'),
 'Zongertinib', 'BI 1810631', 'Zongertinib', 'Small Molecule', 'HER2 TKD',
 'Oral irreversible HER2-selective TKI that potently inhibits HER2 TKD activating mutations while sparing EGFR, markedly reducing rash and GI toxicity vs. non-selective HER2 TKIs',
 'Approved', 'Approved', TRUE, FALSE, TRUE, TRUE,
 'Hernexeos; FDA accelerated approval August 8 2025 for non-squamous NSCLC with HER2 TKD activating mutations after prior platinum-based chemotherapy. First HER2-selective (EGFR-sparing) TKI approved.'),

((SELECT id FROM companies WHERE company_name = 'AbbVie'),
 'Telisotuzumab Vedotin', 'ABBV-399', 'Telisotuzumab Vedotin-tllv', 'ADC', 'c-Met',
 'Anti-c-Met ADC conjugated to MMAE via protease-cleavable linker; c-Met overexpression drives tumour growth in a subset of EGFR wild-type non-squamous NSCLC',
 'Approved', 'Approved', TRUE, FALSE, TRUE, TRUE,
 'Emrelis; FDA accelerated approval May 14 2025 for previously treated non-squamous NSCLC with high c-Met protein overexpression (IHC 3+) and no sensitising EGFR mutation. First approved c-Met-targeting ADC. LUMINOSITY Phase II ORR 35.3%.'),

((SELECT id FROM companies WHERE company_name = 'Regeneron'),
 'Linvoseltamab', 'REGN5458', 'Linvoseltamab-gcpt', 'Bispecific', 'BCMA/CD3',
 'BCMA x CD3 bispecific antibody redirecting cytotoxic T cells to BCMA-expressing myeloma cells; IV administration with step-up dosing to mitigate CRS',
 'Approved', 'Approved', FALSE, TRUE, TRUE, TRUE,
 'Lynozyfic; FDA accelerated approval July 2 2025 for relapsed or refractory multiple myeloma after 3+ prior lines (PI, IMiD, anti-CD38 mAb). LINKER-MM1 Phase I/II: ORR 71%, CRR 50%. Competes with elranatamab and teclistamab in BCMA/CD3 bispecific class.'),

((SELECT id FROM companies WHERE company_name = 'Arvinas'),
 'Vepdegestrant', 'ARV-471', 'Vepdegestrant', 'Small Molecule', 'ER/ESR1',
 'First-in-class oral PROTAC ER degrader recruiting cereblon E3 ligase to ubiquitinate and degrade both wild-type and ESR1-mutant oestrogen receptor; mechanism distinct from SERDs',
 'Approved', 'Approved', TRUE, FALSE, TRUE, TRUE,
 'Veppanu; FDA approved May 1 2026 for ER+/HER2-negative, ESR1-mutated locally advanced or metastatic breast cancer after endocrine therapy and CDK4/6 inhibitor. VERITAC-2 Phase III. First approved PROTAC drug for any oncology indication globally.'),

((SELECT id FROM companies WHERE company_name = 'Celcuity'),
 'Gedatolisib', 'PF-05212384', 'Gedatolisib', 'Small Molecule', 'PI3K/mTOR',
 'Pan-class I PI3K and mTOR dual inhibitor active across PIK3CA-wildtype tumours where PTEN loss or other PI3K pathway alterations drive resistance to endocrine therapy',
 'Approved', 'Approved', FALSE, FALSE, TRUE, TRUE,
 'Revtorpyk; FDA approved July 14 2026 with fulvestrant +/- palbociclib for HR+/HER2- locally advanced or metastatic breast cancer without PIK3CA mutation, after 1+ endocrine therapy. VIKTORIA-1 Phase III. Complements inavolisib (PIK3CA-mutated) to cover both PI3K subgroups in HR+ BC.'),

((SELECT id FROM companies WHERE company_name = 'Jazz Pharmaceuticals'),
 'Lurbinectedin', 'PM01183', 'Lurbinectedin', 'Small Molecule', 'RNA Pol II',
 'Selective inhibitor of oncogenic transcription; covalently binds RNA polymerase II in tumour cells and tumour-associated macrophages, with particular activity in transcription-dependent cancers including SCLC',
 'Approved', 'Approved', FALSE, TRUE, FALSE, FALSE,
 'Zepzelca; originally approved 2020 as 2L+ SCLC monotherapy. New FDA approval October 2 2025 in combination with atezolizumab for extensive-stage SCLC. Expands lurbinectedin from salvage to 1L combination setting.'),

((SELECT id FROM companies WHERE company_name = 'BeiGene'),
 'Sonrotoclax', 'BGB-11417', 'Sonrotoclax', 'Small Molecule', 'BCL-2',
 'Next-generation oral highly selective BCL-2 inhibitor with significantly higher BCL-2 binding affinity than venetoclax; designed to overcome venetoclax-resistance mutations in the BCL-2 BH3 binding groove',
 'Approved', 'Approved', FALSE, TRUE, TRUE, TRUE,
 'Beqalzi; FDA accelerated approval May 13 2026 for relapsed or refractory mantle cell lymphoma after 2+ prior lines. Developed by BeiGene (now BeOne Medicines). Next-generation BCL-2 inhibition with potential activity in venetoclax-resistant patients.'),

((SELECT id FROM companies WHERE company_name = 'Bayer'),
 'Darolutamide', 'ODM-201', 'Darolutamide', 'Small Molecule', 'AR',
 'Oral non-steroidal androgen receptor inhibitor with structurally unique design providing minimal CNS penetration, reducing CNS adverse effects vs. enzalutamide and apalutamide',
 'Approved', 'Approved', FALSE, FALSE, FALSE, FALSE,
 'Nubeqa; approved June 3 2025 for metastatic castration-sensitive prostate cancer (mCSPC) with ADT based on ARANZO Phase III. Prior approvals in nmCRPC (2019) and mCRPC (2022). CNS safety advantage differentiates it in the AR inhibitor class.'),

((SELECT id FROM companies WHERE company_name = 'Akeso'),
 'Penpulimab', 'AK105', 'Penpulimab-kcqx', 'Monoclonal Antibody', 'PD-1',
 'Humanised IgG1 anti-PD-1 monoclonal antibody with Fc-engineered framework reducing FcgR binding to minimise antibody-dependent cellular phagocytosis of T cells',
 'Approved', 'Approved', FALSE, FALSE, FALSE, FALSE,
 'FDA approved April 23 2025 for non-keratinizing nasopharyngeal carcinoma (NPC) after platinum-based chemotherapy. First Akeso drug to receive FDA approval for the US market.'),

((SELECT id FROM companies WHERE company_name = 'Bayer'),
 'Sevabertinib', 'BAY 2927088', 'Sevabertinib', 'Small Molecule', 'HER2 TKD',
 'Oral potent HER2-selective TKI targeting HER2 TKD activating mutations in non-squamous NSCLC; high selectivity to spare EGFR and reduce rash and GI toxicity',
 'Approved', 'Approved', FALSE, FALSE, TRUE, FALSE,
 'Hyrnuo; FDA accelerated approval November 19 2025 for non-squamous NSCLC with HER2 TKD activating mutations after prior platinum-based chemotherapy. Second HER2-selective TKI approved for this indication after zongertinib (August 2025).');


-- ============================================================
-- SECTION 6: NEW DRUG INDICATIONS
-- drug_id resolved by drug_name — no hardcoded IDs
-- ============================================================

INSERT INTO drug_indications (drug_id, therapeutic_area, cancer_type, indication, biomarker, line_of_therapy, development_phase, approval_status, market_priority, is_primary, notes)
VALUES

((SELECT id FROM drugs WHERE drug_name = 'Zongertinib'),
 'Oncology', 'Non-Small Cell Lung Cancer',
 'Previously treated non-squamous NSCLC with HER2 TKD activating mutations, after prior platinum-based chemotherapy',
 'HER2 TKD mutation', '2L+', 'Approved', 'Approved', 'High', TRUE,
 'FDA accelerated approval August 8 2025; BEAMION LUNG-1 Phase Ib/II; first HER2-selective TKI — EGFR-sparing design reduces rash and diarrhoea vs. non-selective HER2 inhibitors'),

((SELECT id FROM drugs WHERE drug_name = 'Telisotuzumab Vedotin'),
 'Oncology', 'Non-Small Cell Lung Cancer',
 'Previously treated non-squamous NSCLC with high c-Met protein overexpression (IHC 3+), EGFR wild-type, after prior platinum-based chemotherapy',
 'c-Met overexpression (IHC 3+)', '2L+', 'Approved', 'Approved', 'High', TRUE,
 'FDA accelerated approval May 14 2025; LUMINOSITY Phase II ORR 35.3% in IHC3+ EGFR wt NSCLC; c-Met IHC companion diagnostic required for patient selection'),

((SELECT id FROM drugs WHERE drug_name = 'Linvoseltamab'),
 'Oncology', 'Multiple Myeloma',
 'Relapsed or refractory multiple myeloma after 3 or more prior lines including a proteasome inhibitor, an immunomodulatory agent, and an anti-CD38 monoclonal antibody',
 NULL, '4L+', 'Approved', 'Approved', 'High', TRUE,
 'FDA accelerated approval July 2 2025; LINKER-MM1 Phase I/II: ORR 71%, CRR 50%, mDOR not reached; IV step-up dosing schedule'),

((SELECT id FROM drugs WHERE drug_name = 'Vepdegestrant'),
 'Oncology', 'Breast Cancer',
 'ER-positive, HER2-negative, ESR1-mutated locally advanced or metastatic breast cancer, after prior endocrine therapy and CDK4/6 inhibitor',
 'ESR1 mutation', '3L+', 'Approved', 'Approved', 'High', TRUE,
 'FDA approved May 1 2026; VERITAC-2 Phase III superior PFS vs. fulvestrant in ESR1-mutated population; first approved PROTAC drug; direct competitor to imlunestrant (Inluriyo, Lilly)'),

((SELECT id FROM drugs WHERE drug_name = 'Gedatolisib'),
 'Oncology', 'Breast Cancer',
 'HR-positive, HER2-negative locally advanced or metastatic breast cancer without PIK3CA mutation, after 1 or more lines of endocrine therapy in metastatic setting, with fulvestrant with or without palbociclib',
 'PIK3CA wild-type', '2L+', 'Approved', 'Approved', 'High', TRUE,
 'FDA approved July 14 2026; VIKTORIA-1 Phase III; approved specifically for PIK3CA wild-type tumours — complementary to inavolisib covering PIK3CA-mutated HR+ BC'),

((SELECT id FROM drugs WHERE drug_name = 'Lurbinectedin'),
 'Oncology', 'Small Cell Lung Cancer',
 'Extensive-stage SCLC, in combination with atezolizumab after platinum-etoposide induction',
 NULL, '1L', 'Approved', 'Approved', 'High', TRUE,
 'FDA approved October 2 2025; expands lurbinectedin from 2L+ monotherapy to 1L combination setting; competitive with durvalumab and atezolizumab in SCLC'),

((SELECT id FROM drugs WHERE drug_name = 'Sonrotoclax'),
 'Oncology', 'Mantle Cell Lymphoma',
 'Relapsed or refractory mantle cell lymphoma after 2 or more prior lines of therapy',
 NULL, '3L+', 'Approved', 'Approved', 'High', TRUE,
 'FDA accelerated approval May 13 2026; next-generation BCL-2 inhibitor with potential activity in venetoclax-resistant settings; BeiGene first BCL-2 inhibitor approval'),

((SELECT id FROM drugs WHERE drug_name = 'Darolutamide'),
 'Oncology', 'Prostate Cancer',
 'Metastatic castration-sensitive prostate cancer (mCSPC), with androgen deprivation therapy',
 NULL, '1L', 'Approved', 'Approved', 'High', TRUE,
 'FDA approved June 3 2025; ARANZO Phase III; expands Nubeqa from nmCRPC and mCRPC to mCSPC — full pan-disease prostate cancer label coverage'),

((SELECT id FROM drugs WHERE drug_name = 'Penpulimab'),
 'Oncology', 'Nasopharyngeal Carcinoma',
 'Non-keratinizing nasopharyngeal carcinoma (NPC), relapsed or metastatic, after platinum-based chemotherapy',
 NULL, '2L+', 'Approved', 'Approved', 'Medium', TRUE,
 'FDA approved April 23 2025; first Akeso drug approved by FDA; NPC is an area of unmet need particularly prevalent in Asian populations'),

((SELECT id FROM drugs WHERE drug_name = 'Sevabertinib'),
 'Oncology', 'Non-Small Cell Lung Cancer',
 'Previously treated non-squamous NSCLC with HER2 TKD activating mutations, after prior platinum-based chemotherapy',
 'HER2 TKD mutation', '2L+', 'Approved', 'Approved', 'High', TRUE,
 'FDA accelerated approval November 19 2025; second approved HER2-selective TKI in NSCLC after zongertinib; validates HER2 TKD selectivity as a clinically meaningful class strategy');


-- ============================================================
-- SECTION 7: DRUG UPDATES — all key 2025-2026 FDA approvals
-- drug_id resolved by drug_name — no hardcoded IDs
-- ============================================================

INSERT INTO drug_updates (drug_id, update_title, update_summary, update_type, source, source_url, update_date)
VALUES

((SELECT id FROM drugs WHERE drug_name = 'Datopotamab Deruxtecan'),
 'Datopotamab Deruxtecan (Datroway) FDA Approved for HR+/HER2- Breast Cancer',
 'FDA approved datopotamab deruxtecan-dlnk (Datroway, Daiichi Sankyo/AstraZeneca) for unresectable or metastatic HR+/HER2-negative breast cancer after prior endocrine-based therapy and chemotherapy. TROPION-Breast01 Phase III (PFS HR 0.63 vs. chemotherapy). First regulatory approval for Dato-DXd anywhere globally.',
 'FDA Approval', 'FDA.gov',
 'https://www.fda.gov/drugs/resources-information-approved-drugs/fda-approves-datopotamab-deruxtecan-dlnk-unresectable-or-metastatic-hr-positive-her2-negative-breast',
 '2025-01-17'),

((SELECT id FROM drugs WHERE drug_name = 'Datopotamab Deruxtecan'),
 'Datopotamab Deruxtecan (Datroway) FDA Accelerated Approval for EGFR-Mutated NSCLC',
 'FDA granted accelerated approval to datopotamab deruxtecan-dlnk for adults with EGFR-mutated unresectable or metastatic NSCLC after prior EGFR-directed therapy and platinum-based chemotherapy. Second Dato-DXd FDA approval within 6 months of the breast cancer approval.',
 'FDA Approval', 'FDA.gov',
 'https://www.fda.gov/drugs/resources-information-approved-drugs/fda-grants-accelerated-approval-datopotamab-deruxtecan-dlnk-egfr-mutated-non-small-cell-lung-cancer',
 '2025-06-23'),

((SELECT id FROM drugs WHERE drug_name = 'Imlunestrant'),
 'Imlunestrant (Inluriyo) FDA Approved for ESR1-Mutated HR+/HER2- Breast Cancer',
 'FDA approved imlunestrant (Inluriyo, Eli Lilly) for ER+/HER2-negative, ESR1-mutated locally advanced or metastatic breast cancer after endocrine therapy and a CDK4/6 inhibitor. Based on EMBER-3 Phase III. First oral SERD with traditional FDA approval.',
 'FDA Approval', 'FDA.gov',
 'https://www.fda.gov/drugs/resources-information-approved-drugs/fda-approves-imlunestrant-er-positive-her2-negative-esr1-mutated-advanced-or-metastatic-breast-cancer',
 '2025-09-25'),

((SELECT id FROM drugs WHERE drug_name = 'Trastuzumab Deruxtecan'),
 'T-DXd (Enhertu) FDA Approved for HER2-Ultralow Breast Cancer — Extends HER2 Paradigm',
 'FDA approved fam-trastuzumab deruxtecan-nxki for HR+/HER2-low and HER2-ultralow unresectable or metastatic breast cancer after prior endocrine therapy. DESTINY-Breast06 Phase III. Extends HER2-directed ADC therapy to HER2-ultralow (IHC0 with faint/incomplete staining), a newly defined population.',
 'FDA Approval', 'FDA.gov',
 'https://www.fda.gov/drugs/resources-information-approved-drugs/fda-approves-fam-trastuzumab-deruxtecan-nxki-unresectable-or-metastatic-hr-positive-her2-low-or-her2',
 '2025-01-27'),

((SELECT id FROM drugs WHERE drug_name = 'Sotorasib'),
 'Sotorasib + Panitumumab Full FDA Approval for KRAS G12C Colorectal Cancer',
 'FDA granted full traditional approval to sotorasib (Lumakras, Amgen) with panitumumab for KRAS G12C-mutated CRC after prior chemotherapy, converting the January 2024 accelerated approval. Based on confirmatory CodeBreaK 300 Phase III overall survival data.',
 'FDA Approval', 'FDA.gov',
 'https://www.fda.gov/drugs/resources-information-approved-drugs/fda-approves-sotorasib-panitumumab-kras-g12c-mutated-colorectal-cancer',
 '2025-01-16'),

((SELECT id FROM drugs WHERE drug_name = 'Tarlatamab'),
 'Tarlatamab (Imdelltra) Converts to Traditional FDA Approval for Relapsed/Refractory SCLC',
 'FDA granted traditional approval to tarlatamab-dlle (Imdelltra, Amgen), converting the May 2024 accelerated approval for ES-SCLC after platinum-based chemotherapy. Based on confirmatory DeLLphi-301 overall survival data. DeLLphi-304 Phase III in 1L SCLC ongoing.',
 'FDA Approval', 'FDA.gov', NULL, '2025-11-19'),

((SELECT id FROM drugs WHERE drug_name = 'Durvalumab'),
 'Durvalumab (Imfinzi) FDA Approved for Resectable Gastric/GEJ Adenocarcinoma',
 'FDA approved durvalumab (Imfinzi, AstraZeneca) for adults with resectable gastric or gastroesophageal junction adenocarcinoma as part of a perioperative chemotherapy regimen. Expands Imfinzi beyond NSCLC, SCLC, and bladder cancer into upper GI oncology.',
 'FDA Approval', 'FDA.gov', NULL, '2025-11-25'),

((SELECT id FROM drugs WHERE drug_name = 'Nivolumab'),
 'Nivolumab + Ipilimumab FDA Approved for First-Line MSI-H/dMMR Metastatic CRC',
 'FDA approved nivolumab (Opdivo, BMS) with ipilimumab for first-line unresectable or metastatic MSI-H or dMMR CRC. CheckMate 8HW Phase III demonstrated superior PFS vs. chemotherapy. Challenges pembrolizumab as preferred IO option in MSI-H/dMMR CRC.',
 'FDA Approval', 'FDA.gov', NULL, '2025-04-08'),

((SELECT id FROM drugs WHERE drug_name = 'Nivolumab'),
 'Nivolumab + Ipilimumab FDA Approved for First-Line Unresectable/Metastatic HCC',
 'FDA approved nivolumab (Opdivo, BMS) with ipilimumab for first-line unresectable or metastatic hepatocellular carcinoma. CheckMate 9DH Phase III demonstrated superior OS vs. sorafenib or lenvatinib.',
 'FDA Approval', 'FDA.gov', NULL, '2025-04-11'),

((SELECT id FROM drugs WHERE drug_name = 'Sacituzumab Govitecan'),
 'Sacituzumab Govitecan + Pembrolizumab FDA Approved for First-Line TNBC',
 'FDA approved sacituzumab govitecan-hziy (Trodelvy, Gilead) as monotherapy and in combination with pembrolizumab for first-line unresectable locally advanced or metastatic TNBC. ASCENT-04/KEYNOTE-D19 Phase III data. Moves SG from 2L+ (ASCENT) to 1L and adds IO combination, significantly expanding the commercial opportunity.',
 'FDA Approval', 'FDA.gov', NULL, '2026-06-24'),

((SELECT id FROM drugs WHERE drug_name = 'Belzutifan'),
 'Belzutifan + Pembrolizumab FDA Approved as Adjuvant Therapy for High-Risk Clear-Cell RCC',
 'FDA approved belzutifan (Welireg, Merck) in combination with pembrolizumab for adjuvant treatment of adults with ccRCC at intermediate-high or high risk of recurrence following nephrectomy. LITESPARK-022 Phase III. First HIF-2alpha inhibitor approved in the adjuvant oncology setting.',
 'FDA Approval', 'FDA.gov', NULL, '2026-06-12'),

((SELECT id FROM drugs WHERE drug_name = 'Cabozantinib'),
 'Cabozantinib (Cabometyx) Label Expanded to Pediatric Patients 12 Years and Older with RCC',
 'FDA expanded the cabozantinib (Cabometyx, Exelixis) label to include pediatric patients 12 years of age and older with previously treated advanced renal cell carcinoma, in addition to the existing adult indication.',
 'Label Expansion', 'FDA.gov', NULL, '2025-03-26'),

((SELECT id FROM drugs WHERE drug_name = 'Zongertinib'),
 'Zongertinib (Hernexeos) First HER2-Selective TKI FDA Approved for HER2 TKD-Mutated NSCLC',
 'FDA granted accelerated approval to zongertinib (Hernexeos, Boehringer Ingelheim) for adults with previously treated non-squamous NSCLC with HER2 TKD activating mutations. First HER2 TKI with true selectivity for HER2 over EGFR, dramatically improving the tolerability profile. BEAMION LUNG-1 Phase Ib/II supporting data.',
 'FDA Approval', 'FDA.gov', NULL, '2025-08-08'),

((SELECT id FROM drugs WHERE drug_name = 'Telisotuzumab Vedotin'),
 'Telisotuzumab Vedotin (Emrelis) FDA Approved — First c-Met ADC in NSCLC',
 'FDA granted accelerated approval to telisotuzumab vedotin-tllv (Emrelis, AbbVie) for previously treated non-squamous NSCLC with high c-Met protein overexpression (IHC 3+) and no sensitising EGFR mutation. First ADC approved targeting c-Met. LUMINOSITY Phase II: ORR 35.3% in c-Met high EGFR wt population.',
 'FDA Approval', 'FDA.gov', NULL, '2025-05-14'),

((SELECT id FROM drugs WHERE drug_name = 'Linvoseltamab'),
 'Linvoseltamab (Lynozyfic) FDA Accelerated Approval for Triple-Class Exposed Multiple Myeloma',
 'FDA granted accelerated approval to linvoseltamab-gcpt (Lynozyfic, Regeneron) for relapsed or refractory multiple myeloma after 3+ prior lines including PI, IMiD, and anti-CD38 mAb. LINKER-MM1 Phase I/II: ORR 71%, CRR 50%. Enters BCMA x CD3 bispecific class alongside elranatamab and teclistamab.',
 'FDA Approval', 'FDA.gov', NULL, '2025-07-02'),

((SELECT id FROM drugs WHERE drug_name = 'Vepdegestrant'),
 'Vepdegestrant (Veppanu) FDA Approved — World First PROTAC Drug Approval in Oncology',
 'FDA approved vepdegestrant (Veppanu, Arvinas) for ER+/HER2-negative, ESR1-mutated locally advanced or metastatic breast cancer after endocrine therapy and CDK4/6 inhibitor. VERITAC-2 Phase III: superior PFS vs. fulvestrant in ESR1-mutated population. First PROTAC drug to receive FDA approval for any oncology indication globally.',
 'FDA Approval', 'FDA.gov', NULL, '2026-05-01'),

((SELECT id FROM drugs WHERE drug_name = 'Gedatolisib'),
 'Gedatolisib (Revtorpyk) FDA Approved for PIK3CA Wild-Type HR+/HER2- Breast Cancer',
 'FDA approved gedatolisib (Revtorpyk, Celcuity) with fulvestrant +/- palbociclib for HR+/HER2- locally advanced or metastatic breast cancer without PIK3CA mutation, after 1+ endocrine therapy. VIKTORIA-1 Phase III. Complements inavolisib (Itovebi) for PIK3CA-mutated patients, creating full PI3K pathway coverage in HR+ BC.',
 'FDA Approval', 'FDA.gov',
 'https://www.fda.gov/drugs/resources-information-approved-drugs/fda-approves-gedatolisib-fulvestrant-or-without-palbociclib-hr-positive-her2-negative-locally',
 '2026-07-14'),

((SELECT id FROM drugs WHERE drug_name = 'Lurbinectedin'),
 'Lurbinectedin + Atezolizumab FDA Approved for Extensive-Stage SCLC',
 'FDA approved lurbinectedin (Zepzelca, Jazz Pharmaceuticals) in combination with atezolizumab for extensive-stage SCLC. Expands lurbinectedin from 2L+ monotherapy into the 1L combination setting, adding a chemotherapy-free combination IO regimen alongside durvalumab and atezolizumab plus chemotherapy options.',
 'FDA Approval', 'FDA.gov', NULL, '2025-10-02'),

((SELECT id FROM drugs WHERE drug_name = 'Sonrotoclax'),
 'Sonrotoclax (Beqalzi) FDA Accelerated Approval for Relapsed/Refractory Mantle Cell Lymphoma',
 'FDA granted accelerated approval to sonrotoclax (Beqalzi, BeiGene/BeOne Medicines) for adults with relapsed or refractory mantle cell lymphoma after 2+ prior lines. Next-generation BCL-2 inhibitor with higher binding affinity than venetoclax, offering potential for patients who progressed on or are intolerant of venetoclax-based therapy.',
 'FDA Approval', 'FDA.gov', NULL, '2026-05-13'),

((SELECT id FROM drugs WHERE drug_name = 'Darolutamide'),
 'Darolutamide (Nubeqa) FDA Approved for Metastatic Castration-Sensitive Prostate Cancer',
 'FDA approved darolutamide (Nubeqa, Bayer) for mCSPC in combination with ADT. ARANZO Phase III demonstrated superior OS and rPFS vs. ADT alone. Expands Nubeqa from nmCRPC and mCRPC to mCSPC, completing full prostate cancer disease spectrum coverage. CNS safety advantage (minimal blood-brain barrier penetration) is key differentiator.',
 'FDA Approval', 'FDA.gov', NULL, '2025-06-03'),

((SELECT id FROM drugs WHERE drug_name = 'Sevabertinib'),
 'Sevabertinib (Hyrnuo) FDA Approved as Second HER2-Selective TKI for HER2-Mutated NSCLC',
 'FDA granted accelerated approval to sevabertinib (Hyrnuo, Bayer) for previously treated non-squamous NSCLC with HER2 TKD activating mutations after prior platinum-based chemotherapy. Second HER2-selective TKI approved for this indication after zongertinib (August 2025), validating the HER2 TKD selectivity approach as a class strategy in NSCLC.',
 'FDA Approval', 'FDA.gov', NULL, '2025-11-19');



 -- ============================================================
-- 09_patch_upcoming_events.sql
-- KMK Pipeline Intelligence Platform — Upcoming Events Patch
-- Sources:
--   AstraZeneca pipeline page (live, as of 29 April 2026)
--   BeOne Medicines pipeline page (live, updated May 2026)
--   Known FDA approvals and regulatory filings through July 2026
--
-- Run AFTER the original 6 seed files AND 08_patch_2025_2026_approvals.sql
-- NO hardcoded IDs — all FKs resolved by drug/trial name lookup.
-- ============================================================


-- ============================================================
-- SECTION 1: MARK EVENTS NOW COMPLETED
-- Events in the original 06_seed file that have since resolved
-- ============================================================

-- Dato-DXd HR+/HER2- FDA submission → Approved Jan 17, 2025
UPDATE upcoming_events
SET status      = 'Completed',
    actual_date = '2025-01-17',
    updated_at  = NOW()
WHERE drug_id = (SELECT id FROM drugs WHERE drug_name = 'Datopotamab Deruxtecan')
  AND event_type = 'FDA Submission'
  AND event_name LIKE '%HR+%';

-- T-DXd DESTINY-Breast06 FDA submission → HER2-ultralow approved Jan 27, 2025
UPDATE upcoming_events
SET status      = 'Completed',
    actual_date = '2025-01-27',
    updated_at  = NOW()
WHERE drug_id = (SELECT id FROM drugs WHERE drug_name = 'Trastuzumab Deruxtecan')
  AND event_type = 'FDA Submission'
  AND event_name LIKE '%Breast06%';

-- Imlunestrant NDA submission → Approved Sep 25, 2025
UPDATE upcoming_events
SET status      = 'Completed',
    actual_date = '2025-09-25',
    updated_at  = NOW()
WHERE drug_id = (SELECT id FROM drugs WHERE drug_name = 'Imlunestrant')
  AND event_type = 'FDA Submission';

-- Zanidatamab PDUFA biliary tract cancer → Approved (Ziihera), convert to Completed
-- FDA approved zanidatamab (Ziihera) for HER2+ BTC in Nov 2023; PDUFA event completed
UPDATE upcoming_events
SET status      = 'Completed',
    actual_date = '2023-11-08',
    updated_at  = NOW()
WHERE drug_id = (SELECT id FROM drugs WHERE drug_name = 'Zanidatamab')
  AND event_type = 'PDUFA Date';


-- ============================================================
-- SECTION 2: NEW UPCOMING EVENTS
-- Sourced live from company pipeline pages, April–July 2026
-- ============================================================

INSERT INTO upcoming_events (drug_id, trial_id, event_name, event_type, expected_date, actual_date, status, importance, description)
VALUES

-- ── TRASTUZUMAB DERUXTECAN (T-DXd / Enhertu) ─────────────────────────────

((SELECT id FROM drugs WHERE drug_name = 'Trastuzumab Deruxtecan'), NULL,
 'DESTINY-Breast05 FDA Regulatory Decision — Post-Neoadjuvant HER2+ Early BC',
 'PDUFA Date', '2025-10-01', NULL, 'Upcoming', 'High',
 'AstraZeneca/Daiichi Sankyo submitted BLA for T-DXd in high-risk HER2+ early breast cancer with residual disease after neoadjuvant therapy. AZ pipeline shows status "Submitted". If approved, expands Enhertu into the earlier adjuvant/post-neoadjuvant setting, competing with T-DM1 (Kadcyla). DESTINY-Breast05 Phase III basis.'),

((SELECT id FROM drugs WHERE drug_name = 'Trastuzumab Deruxtecan'), NULL,
 'DESTINY-Lung04 Phase III Interim Analysis — 1L HER2-Mutated NSCLC',
 'Interim Analysis', '2026-12-01', NULL, 'Upcoming', 'High',
 'DESTINY-Lung04 is a Phase III trial of T-DXd as first-line treatment for HER2 TKD-mutated non-squamous NSCLC vs. standard of care. Pre-specified interim PFS analysis expected H2 2026. If positive, would expand T-DXd from 2L+ (DESTINY-Lung02) to 1L in HER2-mutated NSCLC — a much larger commercial opportunity.'),

((SELECT id FROM drugs WHERE drug_name = 'Trastuzumab Deruxtecan'), NULL,
 'DESTINY-Breast09 FDA Approval — 1L HER2+ Breast Cancer (T-DXd + Pertuzumab)',
 'FDA Approval', '2025-05-01', '2025-05-28', 'Completed', 'High',
 'FDA approved T-DXd + pertuzumab as 1L treatment for HER2+ metastatic breast cancer (DESTINY-Breast09 Phase III). AZ pipeline marks this as "Launched". Represents first ADC-based first-line regimen in HER2+ BC, challenging trastuzumab + pertuzumab + docetaxel standard.'),

-- ── DATOPOTAMAB DERUXTECAN (Dato-DXd / Datroway) ─────────────────────────

((SELECT id FROM drugs WHERE drug_name = 'Datopotamab Deruxtecan'), NULL,
 'TROPION-Breast02 FDA Regulatory Decision — 1L TNBC (Not Candidates for IO)',
 'PDUFA Date', '2026-02-01', NULL, 'Upcoming', 'High',
 'AstraZeneca/Daiichi Sankyo submitted Dato-DXd for 1L TNBC in patients who are not candidates for PD-L1-based immunotherapy (TROPION-Breast02 Phase III). AZ pipeline shows status "Submitted" as of April 2026. If approved, expands Datroway into 1L TNBC — a high-volume, high-unmet-need setting where sacituzumab govitecan is current standard.'),

((SELECT id FROM drugs WHERE drug_name = 'Datopotamab Deruxtecan'), NULL,
 'TROPION-Lung07 Phase III Interim Analysis — 1L PD-L1 <50% NSCLC + Pembrolizumab',
 'Interim Analysis', '2027-06-01', NULL, 'Upcoming', 'High',
 'TROPION-Lung07 is a Phase III trial of Dato-DXd + pembrolizumab in 1L non-squamous NSCLC with PD-L1 TPS <50% (the majority of patients). This is arguably the largest commercial opportunity in the Dato-DXd programme; PFS primary endpoint readout expected 2027. Competitive with sacituzumab govitecan + pembrolizumab (ASCENT-04) and carboplatin-pembro combinations.'),

((SELECT id FROM drugs WHERE drug_name = 'Datopotamab Deruxtecan'), NULL,
 'TROPION-Lung08 Full Phase III Readout — 1L PD-L1 ≥50% NSCLC + Pembrolizumab',
 'Topline Results', '2026-09-01', NULL, 'Upcoming', 'High',
 'TROPION-Lung08 Phase III (Dato-DXd + pembrolizumab vs. pembrolizumab alone in 1L PD-L1 TPS ≥50% NSQ NSCLC). The June 2025 accelerated approval was based on combination data; full OS readout from confirmatory trial expected ESMO 2026. Competes directly with pembrolizumab monotherapy (KEYNOTE-024 SoC).'),

((SELECT id FROM drugs WHERE drug_name = 'Datopotamab Deruxtecan'), NULL,
 'TROPION-Lung14 Phase III Primary Analysis — 1L EGFRm NSCLC + Osimertinib',
 'Topline Results', '2027-06-01', NULL, 'Upcoming', 'High',
 'TROPION-Lung14 is a Phase III trial of Dato-DXd + osimertinib vs. osimertinib alone in 1L EGFRm NSCLC (FLAURA3). Phase II TROPION-Lung12 data presented at ASCO 2025 showed promising PFS benefit (HR ~0.51). This Phase III readout is a major catalyst that could redefine 1L EGFRm NSCLC standard of care if confirmed.'),

-- ── RILVEGOSTOMIG (ARTEMIDE program) ─────────────────────────────────────

((SELECT id FROM drugs WHERE drug_name = 'Rilvegostomig'), NULL,
 'ARTEMIDE-Lung02 Phase III Primary PFS Readout — 1L Squamous NSCLC',
 'Topline Results', '2026-09-01', NULL, 'Upcoming', 'High',
 'ARTEMIDE-Lung02: rilvegostomig + chemotherapy vs. pembrolizumab + chemotherapy in 1L PD-L1 TC ≥1% squamous NSCLC. The most advanced rilvegostomig Phase III. AZ pipeline as of April 2026 confirms Phase III status. Positive readout would be first demonstration that PD-1/TIGIT bispecific + chemo beats pembrolizumab + chemo in SQ NSCLC. Market at stake: $3B+ annually.'),

((SELECT id FROM drugs WHERE drug_name = 'Rilvegostomig'), NULL,
 'ARTEMIDE-Lung03 Phase III Interim — 1L Non-Squamous NSCLC',
 'Interim Analysis', '2027-03-01', NULL, 'Upcoming', 'High',
 'ARTEMIDE-Lung03: rilvegostomig (monotherapy, no chemo) vs. pembrolizumab in 1L PD-L1 TC ≥1% non-squamous NSCLC. Represents the IO-only head-to-head trial. Pre-specified interim expected early 2027. Complements ARTEMIDE-Lung02 (chemo combination) and -Lung04 (PD-L1 ≥50% enriched).'),

((SELECT id FROM drugs WHERE drug_name = 'Rilvegostomig'), NULL,
 'ARTEMIDE-Lung04 Phase III Interim — 1L PD-L1 ≥50% NSCLC',
 'Interim Analysis', '2027-06-01', NULL, 'Upcoming', 'Medium',
 'ARTEMIDE-Lung04: rilvegostomig monotherapy vs. pembrolizumab in 1L PD-L1 ≥50% NSCLC (all histologies). Directly targets pembrolizumab''s strongest indication. AZ pipeline confirms Phase III. If positive alongside -Lung03, would generate the broadest IO label for a PD-1/TIGIT bispecific.'),

-- ── VOLRUSTOMIG (eVOLVE program) ─────────────────────────────────────────

((SELECT id FROM drugs WHERE drug_name = 'Volrustomig'), NULL,
 'eVOLVE-Lung02 Phase III Primary Readout — 1L Metastatic NSCLC',
 'Topline Results', '2027-06-01', NULL, 'Upcoming', 'High',
 'eVOLVE-Lung02: volrustomig (PD-1/CTLA-4 bispecific) vs. pembrolizumab in 1L metastatic NSCLC (all-comer). AZ pipeline as of April 2026 confirms Phase III. Positions AZ with both a PD-1/TIGIT (rilvegostomig) and a PD-1/CTLA-4 (volrustomig) bispecific in Phase III in NSCLC. Positive readout would challenge Opdualag (nivolumab + relatlimab) and ipilimumab + nivolumab combinations.'),

((SELECT id FROM drugs WHERE drug_name = 'Volrustomig'), NULL,
 'eVOLVE-HNSCC Phase III Interim — Locally Advanced Head & Neck Cancer',
 'Interim Analysis', '2027-06-01', NULL, 'Upcoming', 'Medium',
 'eVOLVE-HNSCC: volrustomig in unresected locally advanced head and neck squamous cell carcinoma. AZ pipeline confirms Phase III. Represents volrustomig expansion beyond NSCLC into HNSCC — a growing IO market with limited approved options post-pembrolizumab.'),

-- ── TARLATAMAB (DeLLphi program) ──────────────────────────────────────────

((SELECT id FROM drugs WHERE drug_name = 'Tarlatamab'), NULL,
 'DeLLphi-305 Phase III Primary Analysis — 1L ES-SCLC Maintenance + Durvalumab',
 'Topline Results', '2027-03-01', NULL, 'Upcoming', 'High',
 'DeLLphi-305: tarlatamab + durvalumab as maintenance after 1L chemo-IO in extensive-stage SCLC. Confirmed Phase III by BeOne Medicines (May 2026). This is Amgen''s first 1L SCLC Phase III for tarlatamab — an enormous market given SCLC''s poor outcomes and limited post-IO options. Positive result would dramatically expand the tarlatamab commercial opportunity beyond 2L+.'),

((SELECT id FROM drugs WHERE drug_name = 'Tarlatamab'), NULL,
 'DeLLphi-312 Phase III Primary Analysis — 1L ES-SCLC Induction + Maintenance (Full Combo)',
 'Topline Results', '2027-09-01', NULL, 'Upcoming', 'High',
 'DeLLphi-312: tarlatamab + durvalumab induction then maintenance vs. chemo + durvalumab in 1L ES-SCLC. Confirmed Phase III by BeOne Medicines (May 2026). The most aggressive 1L expansion for tarlatamab — replacing chemotherapy induction entirely. Complements DeLLphi-305 (maintenance only design).'),

((SELECT id FROM drugs WHERE drug_name = 'Tarlatamab'), NULL,
 'DeLLphi-306 Phase III Primary Analysis — Limited-Stage SCLC',
 'Topline Results', '2028-01-01', NULL, 'Upcoming', 'Medium',
 'DeLLphi-306: tarlatamab in limited-stage SCLC — a curative-intent setting. Confirmed Phase III by BeOne Medicines (May 2026). If successful, would be the first DLL3-directed therapy in LS-SCLC where cure rates remain poor (~15–25%). Longer timelines given adjuvant/curative-intent design requiring OS endpoint.'),

-- ── DURVALUMAB (Imfinzi) ──────────────────────────────────────────────────

((SELECT id FROM drugs WHERE drug_name = 'Durvalumab'), NULL,
 'POTOMAC Phase III FDA Regulatory Decision — Non-Muscle Invasive Bladder Cancer',
 'PDUFA Date', '2026-06-01', NULL, 'Upcoming', 'High',
 'AstraZeneca submitted durvalumab + BCG for non-muscle invasive bladder cancer (NMIBC) based on POTOMAC Phase III. AZ pipeline marks status as "Submitted" as of April 2026. If approved, would be the first IO + BCG combination in NMIBC — a large market with unmet need in BCG-refractory patients.'),

((SELECT id FROM drugs WHERE drug_name = 'Durvalumab'), NULL,
 'KUNLUN Phase III Primary Analysis — Locally Advanced ESCC + Chemoradiotherapy',
 'Topline Results', '2026-12-01', NULL, 'Upcoming', 'Medium',
 'KUNLUN: durvalumab + concurrent chemoradiotherapy (CRT) in locally advanced esophageal squamous cell carcinoma (ESCC). AZ pipeline confirms Phase III. Analogous to the PACIFIC trial design (durvalumab consolidation after CRT) applied to ESCC. If positive, mirrors osimertinib''s LAURA success in NSCLC but in ESCC.'),

-- ── OSIMERTINIB (Tagrisso) ────────────────────────────────────────────────

((SELECT id FROM drugs WHERE drug_name = 'Osimertinib'), NULL,
 'NeoADAURA Phase III Primary Readout — Neoadjuvant Stage II/III EGFRm NSCLC',
 'Topline Results', '2026-06-01', NULL, 'Upcoming', 'High',
 'NeoADAURA: osimertinib +/- chemotherapy as neoadjuvant treatment in resectable Stage II/III EGFRm NSCLC. AZ pipeline confirms Phase III. Primary pCR/EFS endpoint readout expected 2026. If positive, expands Tagrisso from the adjuvant setting (ADAURA) into neoadjuvant — capturing the perioperative window and potentially increasing patients receiving osimertinib from ~12 to 24+ months total.'),

-- ── ZANIDATAMAB ──────────────────────────────────────────────────────────

((SELECT id FROM drugs WHERE drug_name = 'Zanidatamab'), NULL,
 'HERIZON-BTC-302 Phase III Primary Analysis — 1L HER2+ BTC + Chemo + PD-1/L1i',
 'Topline Results', '2027-06-01', NULL, 'Upcoming', 'High',
 'HERIZON-BTC-302: zanidatamab + chemotherapy + PD-1/L1 inhibitor in 1L HER2-amplified biliary tract cancer. Confirmed Phase III Confirmatory trial per BeOne pipeline (May 2026). The 2L approval (Ziihera, HERIZON-BTC-01) already achieved; this moves to 1L and adds IO combination — a transformative opportunity if positive given the limited 1L options in HER2+ BTC.'),

-- ── ZANUBRUTINIB ──────────────────────────────────────────────────────────

((SELECT id FROM drugs WHERE drug_name = 'Zanubrutinib'), NULL,
 'MANGROVE Phase III Primary Readout — Treatment-Naive Mantle Cell Lymphoma',
 'Topline Results', '2026-09-01', NULL, 'Upcoming', 'High',
 'MANGROVE: zanubrutinib as first-line treatment for mantle cell lymphoma (TN MCL). BeOne pipeline (May 2026) confirms Phase III. The existing MCL approval is for R/R disease; 1L MCL approval based on MANGROVE would be highly commercially significant — MCL patients could start Brukinsa at diagnosis rather than after relapse. Phase III vs. BR (bendamustine + rituximab).'),

-- ── SONROTOCLAX ───────────────────────────────────────────────────────────

((SELECT id FROM drugs WHERE drug_name = 'Sonrotoclax'), NULL,
 'CELESTIAL-TNCLL Phase III Primary Readout — 1L CLL (+ Zanubrutinib vs Venetoclax + Obi)',
 'Topline Results', '2027-06-01', NULL, 'Upcoming', 'High',
 'CELESTIAL-TNCLL: sonrotoclax + zanubrutinib vs. venetoclax + obinutuzumab in treatment-naive CLL. BeOne pipeline (May 2026) confirms Phase III. If positive, this would establish next-generation BCL-2 inhibition as the backbone for all-oral BTK + BCL-2 doublet in 1L CLL — a massive commercial shift away from venetoclax + obinutuzumab standard of care.'),

((SELECT id FROM drugs WHERE drug_name = 'Sonrotoclax'), NULL,
 'CELESTIAL-RRCLL Phase III Primary Readout — R/R CLL (+ Zanubrutinib vs Venetoclax)',
 'Topline Results', '2027-09-01', NULL, 'Upcoming', 'High',
 'CELESTIAL-RRCLL: sonrotoclax + zanubrutinib vs. venetoclax + rituximab in relapsed/refractory CLL. BeOne pipeline (May 2026) confirms Phase III. This trial specifically addresses whether next-gen BCL-2 can outperform venetoclax in patients who need it most — R/R CLL where venetoclax resistance is an emerging clinical problem.'),

-- ── IVONESCIMAB ───────────────────────────────────────────────────────────

((SELECT id FROM drugs WHERE drug_name = 'Ivonescimab'), NULL,
 'HARMONi-3 US Phase III Enrollment Completion — Ivonescimab vs Pembrolizumab (1L PD-L1 ≥50% NSCLC)',
 'Phase III Initiation', '2026-12-01', NULL, 'Upcoming', 'High',
 'Summit Therapeutics launched HARMONi-3, the US global Phase III registration trial comparing ivonescimab vs. pembrolizumab in 1L PD-L1 ≥50% NSCLC. This is the trial the FDA will require for US approval. HARMONi-2 (China data, ESMO 2024: HR 0.51 PFS) cannot support US approval alone. Enrollment completion milestone expected late 2026; primary PFS readout targeted 2028.'),

-- ── SACITUZUMAB GOVITECAN ─────────────────────────────────────────────────

((SELECT id FROM drugs WHERE drug_name = 'Sacituzumab Govitecan'), NULL,
 'ASCENT-04 / KEYNOTE-D19 Phase III OS Readout — 1L TNBC + Pembrolizumab Confirmatory OS',
 'Topline Results', '2027-03-01', NULL, 'Upcoming', 'High',
 'ASCENT-04/KEYNOTE-D19: sacituzumab govitecan + pembrolizumab in 1L TNBC. FDA approved June 24, 2026. Confirmatory OS readout from Phase III will convert to traditional approval and validate the combination''s survival benefit. OS data expected 2027 at ASH or ESMO. Competitive with Dato-DXd + pembrolizumab (TROPION-Breast05, 1L TNBC) in the same indication.'),

-- ── BELZUTIFAN ────────────────────────────────────────────────────────────

((SELECT id FROM drugs WHERE drug_name = 'Belzutifan'), NULL,
 'LITESPARK-022 Phase III OS Readout — Adjuvant Belzutifan + Pembrolizumab in ccRCC',
 'Topline Results', '2027-09-01', NULL, 'Upcoming', 'High',
 'LITESPARK-022: belzutifan + pembrolizumab as adjuvant therapy after nephrectomy for high-risk ccRCC. FDA approved June 12, 2026. Confirmatory OS data from Phase III expected 2027. First HIF-2alpha inhibitor in adjuvant setting; Merck needs OS data to convert to traditional approval. Could also inform future adjuvant combinations with pembrolizumab + Welireg.'),

-- ── SELPERCATINIB ─────────────────────────────────────────────────────────

((SELECT id FROM drugs WHERE drug_name = 'Selpercatinib'), NULL,
 'LIBRETTO-431 Phase III OS Final Analysis — 1L RET-Mutated NSCLC',
 'Topline Results', '2026-09-01', NULL, 'Upcoming', 'Medium',
 'LIBRETTO-431 Phase III (selpercatinib vs. platinum-pemetrexed +/- pembrolizumab in 1L RET-mutated NSCLC) already met PFS primary endpoint. OS final analysis is pending and expected at ESMO 2026. OS readout will support conversion to full traditional approval in 1L RET+ NSCLC and definitively establish selpercatinib over chemotherapy as the 1L standard.'),

-- ── CABOZANTINIB ──────────────────────────────────────────────────────────

((SELECT id FROM drugs WHERE drug_name = 'Cabozantinib'), NULL,
 'STELLAR-303 Phase III Primary Readout — XL092 + Atezo vs Cabozantinib in 2L RCC',
 'Topline Results', '2026-12-01', NULL, 'Upcoming', 'High',
 'STELLAR-303 (Exelixis): XL092 + atezolizumab vs. cabozantinib in previously treated advanced RCC. BeOne/Exelixis Phase III. If XL092 combination shows superiority over cabozantinib monotherapy, it would cannibalize Cabometyx revenue (Exelixis'' own next-gen molecule vs. its current standard). This internal competition and readout timing is a key commercial intelligence data point.'),

-- ── EPCORITAMAB ───────────────────────────────────────────────────────────

((SELECT id FROM drugs WHERE drug_name = 'Epcoritamab'), NULL,
 'EPCORE DLBCL-2 Phase III Primary Readout — 1L DLBCL + R-CHOP',
 'Topline Results', '2026-06-01', NULL, 'Upcoming', 'High',
 'EPCORE DLBCL-2: epcoritamab + R-CHOP vs. R-CHOP in 1L diffuse large B-cell lymphoma. Genmab/AbbVie Phase III. If positive, this would move epcoritamab from R/R DLBCL (current accelerated approval) into first-line — the highest-volume DLBCL treatment setting. Results expected ASCO or EHA 2026. Directly competes with mosunetuzumab and glofitamab combinations in this space.'),

-- ── NAVITOCLAX ────────────────────────────────────────────────────────────

((SELECT id FROM drugs WHERE drug_name = 'Navitoclax'), NULL,
 'AbbVie Navitoclax + Ruxolitinib NDA FDA Decision — Myelofibrosis',
 'PDUFA Date', '2026-01-01', NULL, 'Upcoming', 'High',
 'AbbVie filed NDA for navitoclax + ruxolitinib for JAKi-naive myelofibrosis based on TRANSFORM-1 Phase III (SVR35 63.2% vs 31.5%; p<0.0001). PDUFA expected Q1 2026. If approved, navitoclax + ruxolitinib becomes first approved BCL-XL/BCL-2 inhibitor combination in myelofibrosis — potentially the new standard of care in JAKi-naive MF. AbbVie''s next major haematology approval after venetoclax.'),

-- ── TUSAMITAMAB RAVTANSINE ────────────────────────────────────────────────

((SELECT id FROM drugs WHERE drug_name = 'Tusamitamab Ravtansine'), NULL,
 'CARMEN-LC04 Phase III OS Readout — CEACAM5+ Non-Squamous NSCLC',
 'Topline Results', '2026-12-01', NULL, 'Upcoming', 'High',
 'CARMEN-LC04: tusamitamab ravtansine vs. docetaxel in CEACAM5-high (IHC ≥2+, ≥50% cells) non-squamous NSCLC after platinum failure. Sanofi Phase III. Primary PFS readout expected mid-late 2026. If positive, would be the first CEA (CEACAM5)-targeting ADC approved in NSCLC — a large biomarker-selected population (~35% of NSQ NSCLC). Head-to-head vs. docetaxel sets a high bar.'),

-- ── PATRITUMAB DERUXTECAN ─────────────────────────────────────────────────

((SELECT id FROM drugs WHERE drug_name = 'Patritumab Deruxtecan'), NULL,
 'HERTHENA-Lung02 Phase III Primary PFS Readout — 3L+ EGFRm NSCLC Post-Osimertinib + Platinum',
 'Topline Results', '2026-06-01', NULL, 'Upcoming', 'High',
 'HERTHENA-Lung02: patritumab deruxtecan (HER3-DXd) vs. platinum doublet chemotherapy in EGFRm NSCLC after osimertinib and platinum chemotherapy. Daiichi Sankyo Phase III. Phase II HERTHENA-Lung01 ORR was 29.8% — promising vs. chemo. Primary PFS data expected at ASCO 2026. If positive, this fills the urgent unmet need in 3L+ EGFRm NSCLC where no targeted option currently exists post-osimertinib + platinum.'),

-- ── IFINATAMAB DERUXTECAN ─────────────────────────────────────────────────

((SELECT id FROM drugs WHERE drug_name = 'Ifinatamab Deruxtecan'), NULL,
 'IDeate-Lung01 Phase III Enrollment Initiation — 2L+ SCLC',
 'Phase III Initiation', '2026-03-01', NULL, 'Upcoming', 'High',
 'Based on IDeate-Lung01 Phase II pivotal data (ORR ~40% in R/R SCLC, presented ASCO 2025), Daiichi Sankyo is expected to initiate a confirmatory Phase III for ifinatamab deruxtecan (I-DXd, B7-H3-targeting ADC) in 2L+ SCLC. Enrollment initiation milestone expected 2026. I-DXd competes directly with tarlatamab (Imdelltra) in R/R SCLC — both targeting the same patient population.'),

-- ── ADAGRASIB ─────────────────────────────────────────────────────────────

((SELECT id FROM drugs WHERE drug_name = 'Adagrasib'), NULL,
 'KRYSTAL-10 Phase III Primary OS Readout — 2L KRAS G12C CRC + Cetuximab',
 'Topline Results', '2026-03-01', NULL, 'Upcoming', 'High',
 'KRYSTAL-10: adagrasib + cetuximab vs. chemotherapy in 2L KRAS G12C-mutated CRC. Accelerated approval granted August 2024. Full OS data from Phase III expected Q1 2026 at ASCO GI or ESMO. If OS is statistically significant, achieves traditional approval. Competes with sotorasib + panitumumab (Lumakras, full approval Jan 2025) in the same KRAS G12C CRC indication. Whichever shows better OS data wins market share.'),

-- ── AMIVANTAMAB ──────────────────────────────────────────────────────────

((SELECT id FROM drugs WHERE drug_name = 'Amivantamab'), NULL,
 'PAPILLON Phase III OS Final Analysis — EGFR Exon 20 Insertion NSCLC',
 'Topline Results', '2026-06-01', NULL, 'Upcoming', 'Medium',
 'PAPILLON Phase III (amivantamab + chemotherapy in 1L EGFR Exon 20 insertion NSCLC) already met PFS primary endpoint. OS final analysis expected ASCO 2026. Full OS data will convert the current regulatory status to traditional approval and establish amivantamab + chemo as the definitive 1L standard in Ex20ins NSCLC — a mutation affecting ~3% of all NSCLC.'),

((SELECT id FROM drugs WHERE drug_name = 'Amivantamab'), NULL,
 'MARIPOSA Phase III OS Final Analysis — 1L EGFR-Mutated NSCLC vs Osimertinib',
 'Topline Results', '2026-09-01', NULL, 'Upcoming', 'High',
 'MARIPOSA Phase III (amivantamab + lazertinib vs. osimertinib in 1L EGFRm NSCLC, ex19del/L858R) met PFS primary endpoint (HR 0.70); FDA approved August 2024. OS final data expected ESMO 2026. If OS favors amivantamab + lazertinib over osimertinib, this is a regime-changing result — replacing the world''s most prescribed NSCLC drug (Tagrisso) with a bispecific + TKI doublet at significant cost and convenience implications.');