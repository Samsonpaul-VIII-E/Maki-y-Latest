mkdir -p app/src/main/java/com/aistudio/maki/ui/theme
mkdir -p app/src/main/java/com/aistudio/maki/screens
mkdir -p app/src/main/java/com/aistudio/maki/components
mkdir -p app/src/main/res/values
mkdir -p app/src/main/res/drawable

cat << 'GRADLE' > settings.gradle.kts
pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}
rootProject.name = "Maki Sovereign"
include(":app")
GRADLE

cat << 'GRADLE' > build.gradle.kts
plugins {
    id("com.android.application") version "8.7.2" apply false
    id("org.jetbrains.kotlin.android") version "2.0.21" apply false
    id("org.jetbrains.kotlin.plugin.compose") version "2.0.21" apply false
}
GRADLE

cat << 'PROP' > gradle.properties
org.gradle.jvmargs=-Xmx2048m -Dfile.encoding=UTF-8
android.useAndroidX=true
kotlin.code.style=official
android.nonTransitiveRClass=true
PROP

cat << 'GRADLE' > app/build.gradle.kts
plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("org.jetbrains.kotlin.plugin.compose")
}

android {
    namespace = "com.aistudio.maki"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.aistudio.maki.cypher"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "1.0"
        
        vectorDrawables {
            useSupportLibrary = true
        }
    }

    signingConfigs {
        getByName("debug") {
            storeFile = file("${rootDir}/debug.keystore")
            storePassword = "android"
            keyAlias = "androiddebugkey"
            keyPassword = "android"
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
        debug {
            signingConfig = signingConfigs.getByName("debug")
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
    buildFeatures {
        compose = true
        buildConfig = true
    }
    packaging {
        resources {
            excludes += "/META-INF/{AL2.0,LGPL2.1}"
        }
    }
}

dependencies {
    implementation("androidx.core:core-ktx:1.15.0")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.8.7")
    implementation("androidx.activity:activity-compose:1.9.3")
    implementation(platform("androidx.compose:compose-bom:2024.11.00"))
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-graphics")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.navigation:navigation-compose:2.8.4")
    implementation("androidx.compose.material:material-icons-extended")
    implementation("io.coil-kt:coil-compose:2.7.0")
    
    // Coroutines
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.9.0")
    
    // Retrofit / Ktor / Moshi if needed... let's stick to simple Retrofit
    implementation("com.squareup.retrofit2:retrofit:2.11.0")
    implementation("com.squareup.retrofit2:converter-gson:2.11.0")
}
GRADLE

cat << 'XML' > app/src/main/AndroidManifest.xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <application
        android:allowBackup="true"
        android:dataExtractionRules="@xml/data_extraction_rules"
        android:fullBackupContent="@xml/backup_rules"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.Maki">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:theme="@style/Theme.Maki">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
XML

mkdir -p app/src/main/res/xml
cat << 'XML' > app/src/main/res/xml/backup_rules.xml
<?xml version="1.0" encoding="utf-8"?>
<full-backup-content xmlns:android="http://schemas.android.com/apk/res/android">
    <include domain="sharedpref" path="."/>
</full-backup-content>
XML

cat << 'XML' > app/src/main/res/xml/data_extraction_rules.xml
<?xml version="1.0" encoding="utf-8"?>
<data-extraction-rules>
    <cloud-network>
        <allow>
            <include domain="sharedpref" path="."/>
        </allow>
    </cloud-network>
</data-extraction-rules>
XML

cat << 'XML' > app/src/main/res/values/strings.xml
<resources>
    <string name="app_name">Maki Sovereign</string>
</resources>
XML

cat << 'XML' > app/src/main/res/values/themes.xml
<resources>
    <style name="Theme.Maki" parent="android:Theme.Material.Light.NoActionBar" />
</resources>
XML

cat << 'KT' > app/src/main/java/com/aistudio/maki/MainActivity.kt
package com.aistudio.maki

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.ui.Modifier
import com.aistudio.maki.ui.theme.MakiTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MakiTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    Text("Hello Android!")
                }
            }
        }
    }
}
KT

cat << 'KT' > app/src/main/java/com/aistudio/maki/ui/theme/Theme.kt
package com.aistudio.maki.ui.theme

import android.app.Activity
import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat

private val DarkColorScheme = darkColorScheme(
    primary = Color(0xFF00FF66), // Cyberpunk Green
    secondary = Color(0xFFFFAA00), // Amber
    tertiary = Color(0xFF00FF66),
    background = Color(0xFF010802),
    surface = Color(0xFF020D04),
    onPrimary = Color.Black,
    onSecondary = Color.Black,
    onTertiary = Color.Black,
    onBackground = Color(0xFF00FF66),
    onSurface = Color(0xFF00FF66)
)

private val LightColorScheme = DarkColorScheme // Always dark theme for Maki

@Composable
fun MakiTheme(
    darkTheme: Boolean = true,
    dynamicColor: Boolean = false,
    content: @Composable () -> Unit
) {
    val colorScheme = DarkColorScheme
    
    val view = LocalView.current
    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as Activity).window
            window.statusBarColor = colorScheme.background.toArgb()
            WindowCompat.getInsetsController(window, view).isAppearanceLightStatusBars = false
        }
    }

    MaterialTheme(
        colorScheme = colorScheme,
        content = content
    )
}
KT

