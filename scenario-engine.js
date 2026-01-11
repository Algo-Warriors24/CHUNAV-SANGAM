function renderInputs() {
  const type = document.getElementById("scenarioType").value;
  let html = "";

  if(type === "early_lok_sabha") {
    html = `<label>कितने महीने पहले?</label>
            <input id="months" type="number" value="12">`;
  }
  else if(type === "split_states") {
    html = `<label>राज्यों की संख्या</label>
            <input id="count" type="number" value="3">`;
  }
  else if(type === "ne_border") {
    html = `<label>प्रभावित जिले</label>
            <input id="districts" type="number" value="12">`;
  }
  else {
    html = `<label>Custom खर्च अनुमान</label><input id="cost" type="number" value="3000">
            <label>स्थिरता प्रभाव?</label><input id="gov" type="number" value="-10">`;
  }

  document.getElementById("inputFields").innerHTML = html;
}

function runScenario() {
  const type = document.getElementById("scenarioType").value;
  document.getElementById("results").classList.remove("hidden");

  let story, cost, gov, table, recommend;

  if(type === "early_lok_sabha") {
    const m = +document.getElementById("months").value;
    story = `${m} महीने पहले लोकसभा भंग होने पर चुनावी लागत बढ़ जाएगी और शासन प्रक्रिया में खिंचाव आएगा।`;
    cost = `लगभग ₹${4000 + m*120} करोड़ अतिरिक्त`;
    gov = `स्थिरता में ${m*2}% की गिरावट`;
    table = [["Security",10000+m*300],["EVM Logistics",8500+m*200],["Polling Staff",5000]];
    recommend = ["राज्यों को फास्ट-ट्रैक संरेखण", "ECI फंडिंग मॉड्यूल अपडेट"];
  }

  if(type === "split_states") {
    const c = +document.getElementById("count").value;
    story = `${c} राज्यों के चुनाव अलग होने से प्रशासनिक लागत और सुरक्षा व्यवस्था बढ़ेगी।`;
    cost = `₹${c*1500} करोड़ तक`;
    gov = `कोऑर्डिनेशन -${c*3} पॉइंट`;
    table = [["Security",c*2000],["Transport",c*1200],["Manpower",c*900]];
    recommend = ["स्टेट-फेडर न्यूनतम हस्तक्षेप", "सीन्ट्रल फंडिंग रोलआउट"];
  }

  if(type === "ne_border") {
    const d = +document.getElementById("districts").value;
    story = `पूर्वोत्तर क्षेत्र में सीमा फेरबदल से ${d} जिलों में चुनावी इकाइयों का पुनर्गठन होगा।`;
    cost = `₹${d*250} करोड़`;
    gov = "संवेदनशील क्षेत्रों में सुरक्षा प्रोटोकॉल तीव्र";
    table = [["Border Units",d*15],["Paramilitary",d*8],["Civil Bureaucracy",d*5]];
    recommend = ["Border Panchayat engagement", "सुरक्षा बैठकें तीव्र"];
  }

  if(type === "custom") {
    story = `User driven scenario based simulation result.`;
    cost = `₹${document.getElementById("cost").value} करोड़`;
    gov = `स्थिरता प्रभाव: ${document.getElementById("gov").value}`;
    table = [["Variable A",1000],["Variable B",800],["Variable C",500]];
    recommend = ["Further data input required", "State-wise tuning"];
  }

  // Inject DOM
  document.getElementById("outputStory").innerText = story;
  document.getElementById("costOut").innerText = cost;
  document.getElementById("govOut").innerText = gov;

  document.getElementById("dataTable").innerHTML =
    `<tr>${["Category","Value"].map(h=>`<th>${h}</th>`).join("")}</tr>` +
    table.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join("");

  document.getElementById("recommendList").innerHTML =
    recommend.map(r => `<li>${r}</li>`).join("");
}
