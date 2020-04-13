	<template>

    <div id="contact" class="panel">
		<header>
			<h2>注册</h2>
            <router-link :to="'/login/Login'">
                <p>已有账号？登陆</p>
            </router-link>
		</header>
		<form action="#" method="post">
			<div>
				<div class="row">
					<div class="col-6 col-12-medium">
						<input type="text" name="name" placeholder="Name" />
					</div>
					<div class="col-6 col-12-medium">
						<input type="text" name="email" placeholder="Email" />
					</div>
					<div class="col-12">
						<input type="text" name="subject" placeholder="Subject" />
					</div>
					<div class="col-12">
						<textarea name="message" placeholder="Message" rows="6"></textarea>
					</div>
                    <div class="col-12">
                        <input type="submit" value="Send Message" />
                    </div>
                </div>
            </div>
        </form>
	</div>

</template>