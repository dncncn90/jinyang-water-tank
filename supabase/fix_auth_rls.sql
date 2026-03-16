-- 1. Profiles 테이블 RLS 정책 설정
-- 기존에 RLS가 활성화되어 있으나 정책이 없어 차단되었던 문제를 해결합니다.

-- 사용자가 자신의 프로필을 직접 생성할 수 있도록 허용
CREATE POLICY "Users can insert their own profile." 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

-- 사용자가 자신의 프로필을 조회할 수 있도록 허용
CREATE POLICY "Users can view their own profile." 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

-- 사용자가 자신의 프로필을 수정할 수 있도록 허용
CREATE POLICY "Users can update their own profile." 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- 2. 소셜 로그인 시 프로필 자동 생성 트리거
-- 소셜 로그인 사용자는 가입 페이지의 insert 로직을 거치지 않으므로 트리거가 필요합니다.

CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, contact_name, contact_phone)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', '사용자'),
    NEW.raw_user_meta_data->>'phone'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 트리거 등록 (기존 트리거가 있다면 드랍 후 재생성)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
