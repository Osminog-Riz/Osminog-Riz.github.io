function get_promise() {
                return new Promise((resolve, reject) => {
                    fetch('https://formcarry.com/s/79D4V9NBj_0', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                        body: JSON.stringify({name: localStorage.getItem("name"), email: localStorage.getItem("email"), comment: localStorage.getItem("comment")})
                    })
                    .then(response => {
                        console.log(response); 
                        localStorage.clear();
                        document.getElementById("name").value = "";
                        document.getElementById("email").value = "";
                        $("#comment").val(localStorage.getItem(""));
                        resolve();
                    })
                    .catch(error => {
                        console.log(error); 
                        alert("Test error!"); 
                        document.getElementById("cat").style.display = "none";
                        document.getElementById("non_act").style.display = "none";
                        reject();
                    })
                });
            }
            $(function(){
                $(".ajaxForm").submit(async function(e){
                    e.preventDefault();
                    document.getElementById("non_act").style.display = "block";
                    document.getElementById("cat").style.display = "block";
                    var x = await get_promise();
                    document.getElementById("cat").style.display = "none";
                    document.getElementById("non_act").style.display = "none";

                    document.getElementById("dog").style.display = "block";
                    var start;
                    function step(timestamp) {
                    if (!start) start = timestamp;
                    var progress = timestamp - start;
                    if (progress > 1100) {
                        document.getElementById("dog").style.display = "none";
                    }
                    if (progress < 1200) {
                        window.requestAnimationFrame(step);
                        }
                    }
                    window.requestAnimationFrame(step);
                });
            });