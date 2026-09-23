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
