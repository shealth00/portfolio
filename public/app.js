// app.js — category filter pills for the Writing section, and the contact
// form (POSTs to this app's own /api/contact endpoint, which is the only
// thing that talks to Supabase — no database keys ever reach the browser).

(function () {
  const pills = document.querySelectorAll('.pill');
  const cards = document.querySelectorAll('#samples .card');
  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      pills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.dataset.filter;
      cards.forEach((card) => {
        const cats = (card.dataset.cat || '').split(' ');
        card.style.display = filter === 'all' || cats.includes(filter) ? '' : 'none';
      });
    });
  });
})();

(function () {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('cf-status');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      name: document.getElementById('cf-name').value.trim(),
      email: document.getElementById('cf-email').value.trim(),
      project: document.getElementById('cf-project').value,
      message: document.getElementById('cf-message').value.trim(),
    };
    if (!payload.name || !payload.email || !payload.message) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    status.hidden = true;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Request failed');
      status.textContent = 'Thanks — your message is in. I’ll reply soon.';
      status.className = 'form-status ok';
      status.hidden = false;
      form.reset();
    } catch (err) {
      status.textContent = 'Something went wrong sending that — please try again in a moment.';
      status.className = 'form-status err';
      status.hidden = false;
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send';
    }
  });
})();

// Full-length versions of the writing samples, opened from each card's
// "Read full piece" trigger. Kept out of the card markup itself so the
// grid stays scannable — the expanded piece is the actual work sample.
(function () {
  const SAMPLES = {
    adhd: {
      meta: 'CME · Neuroscience · ICD-10 F90.9',
      title: 'ADHD: A Circuit-Level Pathophysiology',
      body: `
        <h4>Beyond "attention deficit"</h4>
        <p>Attention-deficit/hyperactivity disorder is still described colloquially as a problem of attention, but the label undersells the biology. ADHD is better modeled as distributed dysfunction across interconnected circuits — frontostriatal, frontoparietal, and default-mode networks that ordinarily coordinate top-down control, working memory, and the suppression of task-irrelevant activity. When those circuits fail to synchronize on schedule, the clinical result is not a single deficit but a cluster of them: inattention, impulsivity, and hyperactivity that vary by context and developmental stage.</p>
        <h4>The frontostriatal loop</h4>
        <p>The core circuit runs from prefrontal cortex through the striatum (particularly the caudate) and back through thalamus to cortex — a loop responsible for response inhibition, working memory, and reward-guided behavior. In ADHD, functional imaging consistently shows underactivation in dorsolateral prefrontal cortex and caudate during tasks demanding inhibitory control, alongside altered connectivity between these regions and the default-mode network, which should quiet down during focused tasks but instead intrudes.</p>
        <h4>Catecholamine signaling</h4>
        <p>Dopamine and norepinephrine are the modulators that tune this circuit's signal-to-noise ratio. Prefrontal norepinephrine acting on alpha-2A receptors strengthens network connectivity and working memory; striatal dopamine, acting through D1 and D2 receptor pathways, shapes reward prediction and action selection. Genetic and neuroimaging studies converge on altered dopamine transporter density and receptor availability in ADHD, which is the mechanistic basis — not an incidental detail — for why stimulant therapy works.</p>
        <h4>Why stimulants are not simply "speeding the brain up"</h4>
        <p>Methylphenidate and amphetamine-class stimulants block dopamine and norepinephrine reuptake, raising synaptic catecholamine levels. At the low-to-moderate doses used clinically, this sharpens the frontostriatal signal rather than producing generalized excitation — improving the circuit's capacity to suppress default-mode intrusion and sustain goal-directed activity. This is the same principle that explains the (frequently misunderstood) paradox of stimulant medication calming, rather than exciting, a hyperactive child: the drug is correcting circuit-level signal quality, not simply increasing arousal.</p>
        <h4>Developmental trajectory</h4>
        <p>Cortical maturation in ADHD follows a similar sequence to typical development but is delayed by several years on average, particularly in prefrontal regions responsible for executive control. This explains both why symptoms often attenuate with age and why the disorder is frequently missed in adults who developed compensatory strategies rather than outgrowing the underlying circuitry.</p>
        <h4>Clinical implication</h4>
        <p>Framing ADHD at the circuit level — rather than as a single neurotransmitter shortfall — changes how clinicians communicate diagnosis and treatment: it explains variable presentation across settings, supports combining pharmacologic and behavioral approaches that target different nodes of the same network, and sets realistic expectations about what medication can and cannot correct.</p>
      `,
    },
    copd: {
      meta: 'Patient education · Pulmonology · ICD-10 J44.9',
      title: 'COPD: What Is Actually Happening in the Lung?',
      body: `
        <h4>Two diseases wearing one name</h4>
        <p>Chronic obstructive pulmonary disease is really a spectrum anchored by two overlapping processes: emphysema, the destruction of alveolar walls, and chronic bronchitis, inflammation and mucus overproduction in the airways. Most patients have some combination of both, and the balance between them shapes symptoms as much as the overall severity does.</p>
        <h4>What destroys the alveoli</h4>
        <p>Alveolar destruction in emphysema is driven by a protease-antiprotease imbalance. Cigarette smoke and other inhaled irritants recruit neutrophils and macrophages into the lung, which release elastase enzymes to fight the irritant. Normally, alpha-1 antitrypsin neutralizes excess elastase; chronic exposure overwhelms that defense, and elastase degrades the elastin scaffold that holds alveolar walls open. The result is fewer, larger air spaces with far less surface area for gas exchange — and, critically, loss of the elastic recoil that normally pushes air out passively during exhalation.</p>
        <h4>Why breathing out is the hard part</h4>
        <p>Losing elastic recoil means the airways lose the structural tension that keeps them open during exhalation. Small airways, no longer tethered by healthy surrounding tissue, collapse before the lung has finished emptying. Air becomes trapped behind those collapsed segments — a phenomenon called dynamic hyperinflation. The patient starts their next breath from a lung that is already partially full, flattening the diaphragm and putting the inspiratory muscles at a severe mechanical disadvantage. This, not the loss of alveoli per se, is what produces the moment-to-moment sensation of breathlessness.</p>
        <h4>The bronchitis half of the story</h4>
        <p>In the chronic bronchitis phenotype, airway inflammation drives goblet cell hyperplasia and mucus gland enlargement, producing the productive cough that defines the clinical diagnosis (by convention, present most days for at least three months in two consecutive years). Excess mucus further narrows already inflamed airways and provides a substrate for recurrent infection, which accelerates further airway damage.</p>
        <h4>Why rehabilitation and breathing technique still matter</h4>
        <p>Destroyed alveoli do not regenerate. But dynamic hyperinflation is partly a functional, moment-to-moment problem — and functional problems respond to functional interventions. Pursed-lip breathing extends expiratory time and adds back-pressure that keeps small airways open longer, directly reducing air trapping. Pulmonary rehabilitation improves the efficiency of peripheral muscles, lowering the ventilatory demand needed for a given activity, and reconditions breathing pattern. Patients frequently ask why exercise is recommended for a disease that limits their breathing; the honest answer is that it does not restore lost lung tissue, but it substantially reduces the mismatch between what the damaged lung can deliver and what daily activity demands.</p>
        <h4>Reading this as a patient</h4>
        <p>Understanding the distinction between structural damage (permanent) and dynamic trapping (partly modifiable) reframes COPD from an unmanageable diagnosis into one with real, if bounded, levers — medication that relaxes airway smooth muscle and reduces inflammation, technique that reduces trapping breath by breath, and conditioning that lowers the overall demand on a lung that has less reserve than it used to.</p>
      `,
    },
    covid: {
      meta: 'CME · Infectious disease · ICD-10 U07.1',
      title: 'SARS-CoV-2: The Host Response Matters',
      body: `
        <h4>Not virus versus inflammation — virus, then inflammation</h4>
        <p>Early public discussion of COVID-19 often framed illness severity as a contest between "the virus" and "the immune response," as though clinicians had to pick a side. The more accurate and clinically useful framing is sequential: viral replication dominates the early disease course, and host inflammatory response dominates later, more severe presentations. That timing is the basis for nearly every major treatment decision in the illness.</p>
        <h4>Entry and early replication</h4>
        <p>SARS-CoV-2 enters host cells via its spike protein binding ACE2, with TMPRSS2 priming the spike protein for membrane fusion. ACE2 is expressed on respiratory epithelium, which is why the upper and lower airway are the primary initial sites of infection. In the first several days, viral replication is the principal driver of symptoms and of transmissibility — this is the window in which antiviral therapy has the clearest mechanistic rationale, because it is a window in which viral load, not immune overactivation, is doing most of the damage.</p>
        <h4>Innate immunity and the interferon response</h4>
        <p>Infected cells detect viral RNA through pattern-recognition receptors and mount a type I interferon response intended to limit viral spread and recruit immune cells. SARS-CoV-2 has evolved several mechanisms to blunt or delay this interferon signal, and the timing of the interferon response — early and robust versus delayed and blunted — correlates strongly with clinical trajectory. A delayed interferon response is associated with higher viral loads persisting longer, setting up a more severe secondary inflammatory phase.</p>
        <h4>The inflammatory phase</h4>
        <p>In patients who progress to more severe disease, roughly one to two weeks into the illness, the picture shifts: viral load often begins to fall, but clinical status worsens. This is the hallmark of a dysregulated inflammatory response — elevated IL-6, IL-1, TNF-alpha, and other cytokines driving capillary leak, alveolar damage, and the diffuse alveolar injury pattern that produces the oxygen requirement seen in more severe COVID-19 pneumonia. This is not simply "more inflammation is bad" — a baseline inflammatory response is necessary to clear the virus. It is a temporal and magnitude mismatch: robust inflammation continuing, or escalating, after it has stopped being useful.</p>
        <h4>Why treatment timing follows biology, not calendar days</h4>
        <p>This two-phase model explains an otherwise confusing clinical fact: antiviral therapy shows the clearest benefit early, when viral replication is the dominant problem, while anti-inflammatory therapy (such as corticosteroids) shows benefit later, specifically in patients who have progressed to requiring supplemental oxygen — and can be harmful if given too early, when it may blunt a host response still doing useful work. Matching intervention to the phase of disease, rather than defaulting to a fixed treatment regardless of timing, is the direct clinical consequence of understanding this mechanism.</p>
        <h4>The teaching point</h4>
        <p>Disease severity in COVID-19 is not explained by the virus alone or the immune system alone, but by how the relationship between the two changes over the course of an illness — a principle that generalizes well beyond this one pathogen.</p>
      `,
    },
    petct: {
      meta: 'Diagnostics · Nuclear medicine · Imaging',
      title: 'PET/CT: Reading the Metabolic Question',
      body: `
        <h4>Two different questions, one image</h4>
        <p>A PET/CT scan answers two separate questions simultaneously and displays them fused: the CT component answers "where is this structure, and what does it look like anatomically," while the PET component answers "how metabolically active is the tissue at this location." Reading the study well means keeping those two questions distinct rather than treating the fused color overlay as a single verdict.</p>
        <h4>How FDG gets trapped</h4>
        <p>The most common PET tracer, 18F-fluorodeoxyglucose (FDG), is a glucose analog. Cells take it up through the same glucose transporters (notably GLUT1) used for ordinary glucose, and hexokinase phosphorylates it to FDG-6-phosphate — the same first step as normal glycolysis. Unlike glucose-6-phosphate, however, FDG-6-phosphate is not a substrate for the next enzyme in glycolysis and is a poor substrate for the dephosphorylation that would let it leave the cell. It becomes effectively trapped, accumulating in proportion to how metabolically active — specifically, how glycolytically active — the tissue is.</p>
        <h4>Why malignant cells light up</h4>
        <p>Many cancers upregulate glucose transporters and hexokinase activity as part of the Warburg effect — a preference for aerobic glycolysis even when oxygen is available, because rapid proliferation favors a metabolic pathway that quickly generates biosynthetic precursors, not just ATP. This elevated glycolytic rate is why FDG accumulates preferentially in many tumors relative to surrounding normal tissue — but "many," not "all" or "only." Tumor histology matters enormously: some cancers, such as well-differentiated hepatocellular carcinoma or certain low-grade lymphomas, are frequently FDG-avid to only a modest degree.</p>
        <h4>What SUV can and cannot tell you</h4>
        <p>Standardized uptake value (SUV) quantifies tracer concentration in a region of interest, normalized to injected dose and body size. It is useful for comparing a lesion's activity to background, tracking a known lesion over time, and supporting — not making — a diagnosis. SUV is not a binary malignancy cutoff: inflammatory and infectious processes are frequently FDG-avid (this is precisely why PET is also used to evaluate infection and inflammatory disease), and physiologic uptake in brown fat, myocardium, bowel, and healing tissue routinely produces SUVs that overlap with malignant ranges. A number in isolation, without correlation to anatomic location, morphology on the CT component, and clinical context, is not an interpretation.</p>
        <h4>Why the fusion matters clinically</h4>
        <p>The CT component supplies the anatomic precision that PET alone lacks — PET resolution is coarse enough that a "hot" focus needs CT to localize it to a specific node, organ, or structure, and to distinguish a genuine mass from physiologic uptake in an adjacent structure. This is also where interpretation errors most often occur: misregistration between the PET and CT acquisitions (from patient motion or respiratory phase mismatch) can visually displace a hot focus from its true anatomic location.</p>
        <h4>The interpretive discipline</h4>
        <p>Reading PET/CT well requires resisting the pull toward treating a bright focus as a self-evident answer. The tracer biology explains what produces signal; the anatomy explains where it is; and only the clinical context — prior imaging, biopsy history, treatment status, and pretest probability — determines what the combination actually means for this patient.</p>
      `,
    },
    crc: {
      meta: 'Oncology · Medical affairs · ICD-10 C18.9',
      title: 'Colorectal Cancer: From Anatomy to Molecular Decision-Making',
      body: `
        <h4>One organ, several diseases</h4>
        <p>Metastatic colorectal cancer is treated, increasingly, as a set of molecularly distinct diseases that happen to arise in the same organ rather than as a single entity with cosmetic variation. Biomarker status now determines first-line regimen selection as much as tumor location or burden does — which means a medical affairs or education piece on this topic has to teach the biology behind the biomarkers, not just list them.</p>
        <h4>RAS status and the EGFR pathway</h4>
        <p>Anti-EGFR monoclonal antibodies (cetuximab, panitumumab) work by blocking a receptor tyrosine kinase that, when activated, signals through the RAS-RAF-MEK-ERK cascade to drive proliferation. RAS (KRAS and NRAS) sits immediately downstream of EGFR in that cascade. When RAS carries an activating mutation, the pathway is switched on independent of upstream receptor signaling — blocking EGFR upstream no longer matters, because the "on" signal is already being generated further down the chain. This is why RAS mutation status is not a refinement of anti-EGFR therapy selection; it is a binary gate. Mutant-RAS tumors do not benefit from anti-EGFR therapy and in some analyses do worse with it, because the mechanism the drug depends on is bypassed entirely.</p>
        <h4>BRAF and a more aggressive branch point</h4>
        <p>BRAF, also downstream of RAS in the same cascade, is mutated (most commonly the V600E variant) in a smaller subset of colorectal cancers, but one associated with distinct biology: right-sided tumor predominance, peritoneal spread, and a substantially worse prognosis with conventional chemotherapy alone. This mutation created the rationale for combining BRAF inhibition with EGFR blockade specifically in this subgroup — a regimen that would not make sense outside this molecular context, since single-agent BRAF inhibition in colorectal cancer is undermined by rapid EGFR-mediated feedback reactivation of the pathway.</p>
        <h4>MSI/dMMR and the immune connection</h4>
        <p>Microsatellite instability-high or mismatch repair-deficient (MSI-H/dMMR) tumors arise from a failure of the DNA mismatch repair system, producing a very high mutational burden. Paradoxically, this is favorable in the metastatic setting for a specific reason: the high mutation burden generates large numbers of neoantigens, making these tumors unusually visible to the immune system and unusually responsive to checkpoint inhibitor immunotherapy — a mechanism-driven exception to the general rule that chemotherapy is the backbone of colorectal cancer treatment.</p>
        <h4>HER2 amplification</h4>
        <p>A smaller subset of RAS/BRAF wild-type tumors show HER2 amplification, defining a further molecular subgroup with rationale for HER2-directed therapy — illustrating that "RAS wild-type" is a starting point for further stratification, not an endpoint.</p>
        <h4>Where biomarker interpretation reaches its limits</h4>
        <p>None of these markers exist in isolation from tumor heterogeneity, and a single biopsy represents a single spatial and temporal sample of a tumor that may harbor multiple clones. Biomarker-guided therapy improves the odds of selecting an active regimen; it does not eliminate the uncertainty inherent in treating a molecularly evolving disease with a point-in-time test.</p>
        <h4>The communication task</h4>
        <p>Explaining this well to a clinical audience means resisting the temptation to present biomarkers as a checklist and instead showing why each one matters mechanistically — because clinicians who understand the pathway logic apply the test results more accurately than those who have simply memorized which mutation excludes which drug.</p>
      `,
    },
    lab: {
      meta: 'Laboratory medicine · Regulatory · Technical',
      title: 'From SOP to Clinical Workflow',
      body: `
        <h4>The gap a good SOP has to close</h4>
        <p>A laboratory result that reaches a clinician as a single number or flag represents the end of a long chain of decisions, controls, and verifications — almost none of which the clinician sees. Technical documentation exists to make that chain reliable and auditable; when it is written well, it also makes the chain legible to the people who depend on its output, not just to the people executing it.</p>
        <h4>Pre-analytical integrity</h4>
        <p>More laboratory error originates before a specimen reaches the analyzer than after. Collection technique, tube type and additive, order of draw, labeling accuracy, transport time and temperature, and processing delay can each independently invalidate a result without producing any obvious analytical anomaly — the assay will faithfully report a wrong number with the same confidence as a right one. Good SOP writing treats pre-analytical steps as first-class technical content, not administrative boilerplate, because that is where a disproportionate share of failure modes actually live.</p>
        <h4>Analytical performance and why validation is not a formality</h4>
        <p>Before an assay reports results used in patient care, it is validated against defined performance characteristics: accuracy against a reference method, precision (repeatability and reproducibility), analytical sensitivity and specificity, reportable range, and interference susceptibility. Validation documentation is not paperwork produced after the real work is done — it is the evidence base that justifies trusting the number the instrument eventually outputs, and it is what a laboratory director, accrediting body, or auditor examines to confirm the assay does what it claims to do, under the specific conditions of that laboratory.</p>
        <h4>Quality systems as ongoing verification, not one-time proof</h4>
        <p>Validation establishes that an assay works; quality control and quality assurance establish that it keeps working. Daily controls, proficiency testing, calibration verification, and trend monitoring exist because analytical performance can drift — reagent lots change, instruments age, environmental conditions shift — and a system that only checked performance once at validation would have no way to detect that drift before it reached a patient result.</p>
        <h4>Documentation as the connective tissue</h4>
        <p>Every step above generates documentation, and the documentation's real function is connective: it is what allows a laboratory to reconstruct, for any given result, the specimen's full history — collection conditions, analytical run, control status, any deviations and their resolution — which matters both for troubleshooting an unexpected result and for regulatory and accreditation review. Technical writing in this domain succeeds when that reconstruction is fast and unambiguous, not merely when the documentation technically exists.</p>
        <h4>The clinical meaning at the end of the chain</h4>
        <p>None of this is visible in the final reported value, and that is precisely the point: a clinician interpreting a result is implicitly trusting every pre-analytical, analytical, and quality-system step that preceded it. Writing that makes those steps clear, auditable, and consistently executed is what allows that trust to be warranted rather than assumed.</p>
      `,
    },
    medaffmoa: {
      meta: 'Medical Affairs · Sample MOA brief · Hypothetical Phase I asset',
      title: 'Mechanism-of-Action Brief: A Phase I Asset in Relapsed/Refractory Lymphoma',
      body: `
        <p><em>This is a portfolio demonstration built around a hypothetical compound and hypothetical Phase I results, written in the format and register of a real medical affairs MOA brief for an HCP audience. No real drug, sponsor, or trial data is represented.</em></p>
        <h4>Unmet need and target rationale</h4>
        <p>Patients with relapsed/refractory diffuse large B-cell lymphoma (DLBCL) who progress after CAR-T therapy have limited options and historically poor outcomes. Compound SH-2201 was developed against a validated but incompletely drugged target in this setting: BCL-2, the anti-apoptotic protein that many DLBCL clones upregulate to escape programmed cell death. Selective BCL-2 inhibition is mechanistically attractive here because resistance to CAR-T frequently involves antigen-independent survival pathways rather than antigen loss alone — meaning a drug that re-sensitizes the cell to apoptosis can work independently of the CAR-T mechanism that already failed.</p>
        <h4>Mechanism of action</h4>
        <p>SH-2201 is an orally bioavailable, selective small-molecule BH3-mimetic. It occupies the hydrophobic groove of BCL-2 that would otherwise sequester pro-apoptotic proteins (BAX/BAK), displacing them and restoring the cell's ability to undergo mitochondrial outer membrane permeabilization in response to normal apoptotic signaling. Selectivity for BCL-2 over BCL-XL is the key differentiation point for an HCP audience: BCL-XL inhibition is the mechanistic driver of the dose-limiting thrombocytopenia seen with earlier, less selective agents in this class, since platelets depend on BCL-XL for survival. A brief written for prescribers should make this structure–toxicity relationship explicit, not just assert "improved safety."</p>
        <h4>Phase I design and population (hypothetical)</h4>
        <p>In this illustrative Phase I dose-escalation study, SH-2201 was evaluated in adults with relapsed/refractory DLBCL after ≥2 prior lines of therapy, including prior CAR-T in roughly half the cohort. The study used a standard 3+3 design with expansion cohorts at the recommended Phase II dose, and included mandatory tumor lysis syndrome (TLS) prophylaxis and a step-up dosing schedule — a direct consequence of BCL-2 inhibition's known mechanism-based TLS risk in high tumor-burden disease.</p>
        <h4>Efficacy signal (hypothetical)</h4>
        <p>At the recommended Phase II dose, the illustrative overall response rate was 41%, with a subset of complete responses concentrated in patients without prior BCL-2-pathway-directed therapy. Consistent with the mechanism, response depth correlated with baseline BCL-2 expression by immunohistochemistry — a biomarker relationship that, if it held in later-phase data, would support enrichment strategies rather than all-comer dosing.</p>
        <h4>Safety profile (hypothetical)</h4>
        <p>The dominant toxicities were mechanism-based: laboratory TLS (managed with prophylaxis and dose titration) and neutropenia, with thrombocytopenia notably less frequent and less severe than historical BCL-XL-inhibiting comparators — the safety signal the mechanism section above was written to set up. No unexpected off-target signal emerged through the dose-escalation cohorts.</p>
        <h4>Why this brief is structured this way</h4>
        <p>A medical affairs MOA brief earns HCP trust by making each downstream claim — the differentiated safety profile, the biomarker-enrichment rationale, the TLS-prophylaxis requirement — traceable back to a specific mechanistic fact established earlier in the document, rather than presenting mechanism and clinical data as separate, loosely connected sections.</p>
      `,
    },
    cmesample: {
      meta: 'CME · Case-based module · Hypothetical Phase I/II data',
      title: 'CME Case Review: Selecting Therapy After CAR-T Failure in DLBCL',
      body: `
        <p><em>This is a portfolio demonstration of case-based CME structure, built around the same hypothetical compound (SH-2201) and hypothetical Phase I/II results used in the Medical Affairs MOA brief sample. No real drug, sponsor, or trial data is represented.</em></p>
        <h4>Learning objectives</h4>
        <p>After completing this module, learners should be able to: (1) describe the mechanistic basis for BCL-2-directed therapy after CAR-T failure in DLBCL; (2) identify the toxicity profile that distinguishes selective BCL-2 inhibition from earlier, less selective agents; and (3) apply Phase I/II efficacy and biomarker data to a treatment-selection decision in a representative case.</p>
        <h4>Case vignette</h4>
        <p>A 67-year-old man with DLBCL relapses eight months after CAR-T therapy, presenting with rapidly enlarging cervical lymphadenopathy and a rising LDH. Biopsy confirms CD19-positive relapse with preserved BCL-2 expression by immunohistochemistry. He has an ECOG performance status of 1 and no significant baseline cytopenias. The treating team is weighing a BCL-2-directed regimen (illustrative agent SH-2201) against a bispecific antibody, and asks: what does the mechanism of relapse tell us about which approach is more likely to work?</p>
        <h4>Discussion: why mechanism of relapse matters here</h4>
        <p>CAR-T failure in DLBCL is mechanistically heterogeneous: some relapses reflect antigen loss or downregulation (CD19-negative escape), while others reflect antigen-independent survival — the tumor cell evades apoptosis despite an intact CAR-T-mediated cytotoxic signal. This case's CD19-positive relapse pattern is more consistent with the latter, which is the specific scenario in which a BCL-2 inhibitor's mechanism — restoring apoptotic sensitivity rather than re-engaging antigen recognition — offers a non-overlapping rationale relative to re-attempting antigen-directed therapy.</p>
        <h4>Applying the illustrative Phase I/II data</h4>
        <p>In the hypothetical Phase I/II dataset introduced in the MOA brief, response to SH-2201 correlated with baseline BCL-2 expression by immunohistochemistry — present in this patient's biopsy. The illustrative safety data (mechanism-based TLS risk, manageable with prophylaxis and step-up dosing; comparatively preserved platelet counts due to BCL-2 selectivity over BCL-XL) are also directly relevant given this patient's preserved baseline counts, which permit standard step-up dosing without dose-reduction adjustments.</p>
        <h4>Faculty discussion prompt</h4>
        <p>Ask learners: if this patient's relapse biopsy had instead shown loss of CD19 expression, would the mechanistic rationale for a BCL-2-directed approach change? (Answer: not materially — BCL-2 inhibition's mechanism is independent of CD19 status, which is precisely why it is positioned as a non-cross-resistant option regardless of the antigen-loss versus antigen-independent relapse distinction; the biomarker that matters for this drug is BCL-2 expression, not CD19.)</p>
        <h4>Why this module is structured this way</h4>
        <p>Case-based CME earns credibility by making the learner apply mechanism to a specific clinical decision point, not just recall it — the case above is built so that the "right answer" is only reachable by reasoning through the mechanism section, not by pattern-matching a drug name to a disease.</p>
      `,
    },
    dxlabsample: {
      meta: 'Diagnostics · Laboratory medicine · Sample result interpretation',
      title: 'Reading the Panel: A Lipid &amp; Inflammatory Marker Report, Explained',
      body: `
        <p><em>This is a portfolio demonstration built around a fictional, composite patient and fictional lab values, written in the format of a diagnostic explainer that walks a reader through a result panel and its clinical implications. No real patient data is represented.</em></p>
        <table class="labtable">
          <tr><th>Test</th><th>Result</th><th>Reference range</th><th>Flag</th></tr>
          <tr><td>Total cholesterol</td><td>248 mg/dL</td><td>&lt;200 mg/dL</td><td class="flag-high">High</td></tr>
          <tr><td>LDL cholesterol</td><td>162 mg/dL</td><td>&lt;100 mg/dL</td><td class="flag-high">High</td></tr>
          <tr><td>HDL cholesterol</td><td>38 mg/dL</td><td>&gt;40 mg/dL (men)</td><td class="flag-low">Low</td></tr>
          <tr><td>Triglycerides</td><td>210 mg/dL</td><td>&lt;150 mg/dL</td><td class="flag-high">High</td></tr>
          <tr><td>hs-CRP</td><td>4.1 mg/L</td><td>&lt;1.0 mg/L (low risk)</td><td class="flag-high">High</td></tr>
        </table>
        <h4>What the lipid pattern means, not just the numbers</h4>
        <p>Reading this panel as four independent "high/low" flags misses the pattern that matters clinically: elevated triglycerides paired with low HDL is the signature of an atherogenic dyslipidemia driven by insulin resistance, not simply "too much fat in the diet." When triglyceride-rich VLDL particles are abundant, cholesteryl ester transfer protein exchanges triglycerides into HDL particles in return for cholesterol — those triglyceride-enriched HDL particles are then cleared faster, which is why HDL falls as triglycerides rise. The LDL number alone doesn't capture this: at this triglyceride level, LDL particles also tend to be smaller and denser than the LDL-C number suggests, and small dense LDL is more atherogenic per particle than the same LDL-C concentration made up of large, buoyant particles.</p>
        <h4>Why hs-CRP was ordered alongside a lipid panel</h4>
        <p>High-sensitivity CRP is not a diagnostic test for any single disease; it is a marker of low-grade systemic inflammation, which independently predicts cardiovascular risk on top of lipid values. An hs-CRP of 4.1 mg/L is in the "high" risk category (&gt;3.0 mg/L) and, combined with this atherogenic lipid pattern, suggests the inflammatory and metabolic risk pathways are both active — relevant because statin therapy's benefit is partly mediated through its anti-inflammatory effect, not cholesterol-lowering alone, which is part of the rationale for statin therapy even in patients whose LDL-C is only moderately elevated but whose hs-CRP is high.</p>
        <h4>Clinical implication</h4>
        <p>Taken together, this pattern points toward an underlying insulin-resistant or metabolic-syndrome-type process rather than an isolated lipid disorder — which changes the workup, not just the treatment: it supports checking a fasting glucose or HbA1c, calculating a 10-year ASCVD risk score that incorporates this lipid and inflammatory data, and framing lifestyle counseling around insulin sensitivity (weight, activity, refined-carbohydrate intake) rather than dietary cholesterol alone, alongside statin therapy where risk calculations support it.</p>
        <h4>Why this explainer is structured this way</h4>
        <p>A diagnostic explainer for a mixed panel like this should connect the individual flagged values into one underlying physiological story before it gets to "what to do about it" — a reader who understands why triglycerides and HDL move together, and why hs-CRP was ordered at all, retains the clinical reasoning, not just the recommendation.</p>
      `,
    },
    clinpatient: {
      meta: 'Clinical & patient communication · Sample informed consent language · Hypothetical Phase II trial',
      title: 'Rewriting Informed Consent for Comprehension, Not Just Compliance',
      body: `
        <p><em>This is a portfolio demonstration of plain-language patient-facing trial communication, built around a hypothetical Phase II trial. It illustrates how IRB-required consent content can be made genuinely readable without losing any required disclosure. No real trial, sponsor, or IRB submission is represented.</em></p>
        <h4>The problem this rewrite solves</h4>
        <p>A standard informed consent form must disclose purpose, procedures, risks, benefits, alternatives, confidentiality, and voluntary withdrawal rights — requirements set by the IRB and, ultimately, by the Common Rule and ICH-GCP. None of that content is optional. What is negotiable is the reading level: consent forms routinely test at a college reading level despite guidance recommending an 8th-grade level, which means the form can be fully compliant and still fail the ethical purpose of informed consent — a participant who signs something they didn't understand has not actually given informed consent, whatever the signature says.</p>
        <h4>Before (compliant but dense)</h4>
        <p style="border-left:3px solid var(--line);padding-left:14px;color:#6b7a83;font-style:italic">"Participants randomized to the investigational arm will receive the study drug administered via subcutaneous injection at a dose of 200mg every 4 weeks for a duration of 24 weeks, with efficacy assessed via the primary endpoint of progression-free survival as determined by RECIST v1.1 criteria at scheduled imaging intervals."</p>
        <h4>After (same disclosures, plain language)</h4>
        <p style="border-left:3px solid var(--teal);padding-left:14px;color:#2c3b44">"If you're randomly assigned to the study drug group, you'll get an injection under your skin every 4 weeks for about 6 months. We'll track whether the treatment is working by doing regular scans and measuring whether your cancer grows, using a standard scoring system doctors use for this."</p>
        <h4>What changed, and what didn't</h4>
        <p>Every required fact is still present — route of administration, dose, frequency, duration, how efficacy is measured, and that measurement's standardized basis. What changed is sentence length (one long compound sentence became three short ones), vocabulary ("randomized," "administered," "duration," "endpoint" replaced or explained), and passive-to-active voice. "RECIST v1.1 criteria" is kept as a phrase (removing it entirely would understate the rigor of the assessment) but is now explained in plain terms rather than left to stand alone.</p>
        <h4>Risk disclosure: the section that most needs this treatment</h4>
        <p>Risk sections are where plain language matters most ethically, because this is the section a participant most needs to actually weigh. A risk written as "Grade 3-4 neutropenia occurred in 12% of participants in the dose-escalation cohort" discloses the fact but not its meaning to a layperson. A plain-language version — "About 1 in 8 people on this dose had a serious drop in a type of white blood cell that fights infection, which can require treatment or a hospital stay" — discloses the same fact in a form the reader can actually use to make a decision, which is the entire ethical purpose of the disclosure requirement.</p>
        <h4>Why this is a writing skill, not just a simplification pass</h4>
        <p>Plain-language consent rewriting fails when it either drops required content to shorten the text, or simplifies vocabulary while leaving sentence structure and organization untouched. Done well, it requires understanding the regulatory requirement well enough to know which words are load-bearing (must stay) and which are just habit (can go) — which is why this work sits at the intersection of clinical writing and regulatory literacy, not general copyediting.</p>
      `,
    },
    regtech: {
      meta: 'Regulatory & technical · Sample SOP · Hypothetical multi-phase program',
      title: 'SOP: Participant Recruitment and IRB Oversight Across Phase I–IV',
      body: `
        <p><em>This is a portfolio demonstration of a controlled-document-style SOP for participant recruitment and ethics oversight across the trial lifecycle, built around a hypothetical clinical development program. No real institution, sponsor, or IRB is represented.</em></p>
        <h4>Purpose and scope</h4>
        <p>This SOP defines the participant recruitment and Institutional Review Board (IRB) oversight process applicable to Phase I through Phase IV clinical trials conducted or supported by the organization. It applies to all clinical, regulatory, and site-facing staff involved in protocol development, recruitment material creation, informed consent administration, and ongoing safety reporting.</p>
        <h4>Phase-specific recruitment considerations</h4>
        <p><b>Phase I</b> recruitment typically enrolls small healthy-volunteer or patient cohorts under dose-escalation designs; recruitment materials must clearly disclose the first-in-human or early-phase nature of the study and the correspondingly higher uncertainty around risk. <b>Phase II</b> recruitment expands to a defined patient population and introduces randomization/blinding language requirements in consent and advertising materials. <b>Phase III</b> recruitment operates at multi-site scale and requires site-level IRB or central IRB coordination, with recruitment materials standardized across sites to avoid protocol-inconsistent claims. <b>Phase IV</b> (post-marketing) recruitment involves an approved product and requires recruitment materials to avoid implying investigational status for an already-approved therapy.</p>
        <h4>IRB submission and review requirements</h4>
        <p>All recruitment materials — advertisements, screening scripts, referral letters, and social media content — require IRB approval prior to use, as they are considered an extension of the informed consent process under 45 CFR 46 and ICH-GCP E6(R2). Materials must not contain language that overstates benefit, understates risk, or implies guaranteed access to treatment. Any material revision requires re-submission and approval before continued use; using an unapproved or expired recruitment material version is a reportable protocol deviation.</p>
        <h4>Informed consent documentation requirements</h4>
        <p>Consent must be obtained prior to any study-related procedure, documented with a dated signature from the participant (or legally authorized representative) and the individual obtaining consent, and re-consent is required whenever a protocol amendment materially changes risk, procedures, or alternatives available to an already-enrolled participant. Non-English-speaking participants require an IRB-approved translated consent form or a qualified interpreter with documentation of the interpretation process — a verbal-only translation without documentation does not satisfy this requirement.</p>
        <h4>Vulnerable population safeguards</h4>
        <p>Recruitment targeting populations defined as vulnerable under 45 CFR 46 Subparts B–D (pregnant individuals, children, prisoners) requires additional IRB-level safeguards, which must be specified in the protocol before recruitment materials referencing that population may be submitted for approval. Socioeconomically disadvantaged populations, while not a formally defined vulnerable category, require documented justification when recruitment is concentrated in a single low-resource site to demonstrate the population isn't being selected for convenience rather than scientific rationale.</p>
        <h4>Ongoing oversight</h4>
        <p>Enrolled-participant safety data is reported to the IRB per the approved reporting schedule (typically continuing review at least annually, plus expedited reporting of unanticipated problems involving risk to participants). Recruitment activity may be paused or terminated by IRB directive if enrollment patterns, safety signals, or protocol deviations warrant review.</p>
        <h4>Why this SOP is structured this way</h4>
        <p>An SOP in this domain has to make the phase-dependent and population-dependent branches explicit rather than writing one generic "get IRB approval" instruction — the actual compliance risk lives in the differences between phases and populations, not in the parts of the process that are the same every time.</p>
      `,
    },
    visualcomm: {
      meta: 'Scientific visual communication · Sample diagrams',
      title: 'Two Diagram Types, Two Different Jobs',
      body: `
        <p>Scientific visual communication isn't one skill — a mechanism map and a diagnostic workflow are built to answer different questions, and using the wrong diagram type for the question is a common way otherwise-accurate figures still fail to teach.</p>
        <div class="diagram-cap">Mechanism map — apoptosis restoration (BCL-2 inhibition)</div>
        <div class="mechmap">
          <div class="mechnode">BCL-2 inhibitor binds hydrophobic groove<span class="mechsub">Molecular event</span></div>
          <div class="mecharrow">→</div>
          <div class="mechnode">BAX/BAK displaced, freed<span class="mechsub">Pathway step</span></div>
          <div class="mecharrow">→</div>
          <div class="mechnode">Mitochondrial membrane permeabilized<span class="mechsub">Cellular event</span></div>
          <div class="mecharrow">→</div>
          <div class="mechnode">Apoptosis proceeds<span class="mechsub">Cell fate</span></div>
          <div class="mecharrow">→</div>
          <div class="mechnode">Tumor burden falls<span class="mechsub">Clinical outcome</span></div>
        </div>
        <p style="font-size:13px;color:var(--muted);margin-top:10px">A mechanism map's job is to make a causal chain traceable left to right, one true step at a time — every arrow is a claim the writer can defend, not decoration.</p>
        <div class="diagram-cap">Diagnostic workflow — incidental thyroid nodule</div>
        <div class="workflow">
          <div class="wf-row">
            <div class="wf-node">Nodule found on imaging</div>
            <div class="wf-arrow">→</div>
            <div class="wf-node">TSH measured</div>
            <div class="wf-arrow">→</div>
            <div class="wf-node decision">TSH normal or high?</div>
          </div>
          <div class="wf-branches">
            <div class="wf-branch"><span class="tag">If suppressed</span><div class="wf-arrow">→</div><div class="wf-node">Thyroid scan (rule out autonomous nodule)</div></div>
            <div class="wf-branch"><span class="tag">If normal/high</span><div class="wf-arrow">→</div><div class="wf-node">Ultrasound risk stratification → FNA if indicated</div></div>
          </div>
        </div>
        <p style="font-size:13px;color:var(--muted);margin-top:10px">A diagnostic workflow's job is different: it has to show a decision point and both of its consequences, not just the "expected" path — a workflow diagram that only shows the common branch will mislead a reader who lands on the uncommon one.</p>
        <h4>Why these are built as different shapes, not just different colors</h4>
        <p>The mechanism map is a single line because biology at this level is (for teaching purposes) sequential — each step causes the next. The workflow is a branching tree because clinical decision-making is genuinely conditional — the correct next action depends on a real-world answer that isn't known in advance. Using a linear diagram to represent a decision point hides the branch a reader actually needs to see; using a branching diagram for a strictly causal mechanism adds a false sense of choice where there isn't one.</p>
      `,
    },
  };

  const overlay = document.getElementById('sample-modal');
  const body = document.getElementById('modal-body');
  const closeBtn = document.getElementById('modal-close');
  if (!overlay || !body) return;

  function open(key) {
    const s = SAMPLES[key];
    if (!s) return;
    body.innerHTML = `<div class="meta">${s.meta}</div><h3>${s.title}</h3>${s.body}`;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    overlay.scrollTop = 0;
  }
  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.read[data-sample]').forEach((btn) => {
    btn.addEventListener('click', () => open(btn.dataset.sample));
  });
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
})();
